### Elf Stack
Help the ElfSOC analysts track down a malicious attack against the North Pole domain.<br><br>
Solved: Silver, Gold (Partial)

---
***Fitzy Shortstack***
> Greetings! I'm the genius behind the North Pole Elf Stack SIEM. And oh boy, we’ve got a situation on our hands.<br><br>
Our system was attacked—Wombley’s faction unleashed their FrostBit ransomware, and it’s caused a digital disaster.<br><br>
The logs are a mess, and Wombley’s laptop—the only backup of the Naughty-Nice List—was smashed to
pieces.<br><br>
Now, it’s all up to you to help me trace the attack vectors and events. We need to figure out how this went down before it’s too late.<br><br>
You’ll be using a containerized ELK stack or Linux CLI tools. Sounds like a fun little puzzle, doesn't it?<br><br>
Your job is to analyze these logs... think of it as tracking snow tracks but in a digital blizzard.<br><br>
If you can find the attack path, maybe we can salvage what’s left and get Santa’s approval.<br><br>
Santa’s furious at the faction fighting, and he’s disappointed. We have to make things right.<br><br>
So, let’s show these attackers that the North Pole’s defenses are no joke!

---

### Silver Solution

The challenge files `log_chunk_1.log` `log_chunk_2.log` seem to consist of RFC 5424 Syslog Messages:

```
<PRI>VERSION TIMESTAMP HOSTNAME APP-NAME - - - {JSON-STRUCTURED-DATA}

```

#### Question 1
*How many unique values are there for the event_source field in all logs?*
> 5

We extract the `APP-NAME` field from each Syslog message. Next we get and count each unique `APP-NAME` value:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | cut -d' ' -f4 | sort | uniq | wc -l
```

#### Question 2
*Which event_source has the fewest number of events related to it?*
> AuthLog

Similarly to Question 1, we extract the `APP-NAME` fields from each Syslog message. Next we count the number of occurrences of each unique `APP-NAME` value. Then we get the `APP-NAME` with the least amount of occurrences:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | cut -d' ' -f4 | sort | uniq -c | sort -k1,1n | head -n 1
```

#### Question 3
*Using the event_source from the previous question as a filter, what is the field name that contains the name of the system the log event originated from?*
> hostname

We get Syslog messages where the `APP-NAME` is `AuthLog`. Next we get all the distinct field names from the `JSON-STRUCTURED-DATA`:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}AuthLog\b' | grep -oP '\{.*?\}' | grep -oP '"\w+"(?=\s*:)' | sort | uniq
```

The field names are:

```
"hostname"
"message"
"service"
"timestamp"
```

#### Question 4
*Which event_source has the second highest number of events related to it?*
> NetflowPmacct

Similarly to Question 2, we get the `APP-NAME` with the second highest amount of occurrences:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | cut -d' ' -f4 | sort | uniq -c | sort -k1,1rn | head -n 2 | tail -n 1
```

#### Question 5
*Using the event_source from the previous question as a filter, what is the name of the field that defines the destination port of the Netflow logs?*
> port_dst

Similarly to Question 3, we get Syslog messages where the `APP-NAME` is `NetflowPmacct`. Next we get all the distinct field names from the `JSON-STRUCTURED-DATA`:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}NetflowPmacct\b' | grep -oP '\{.*?\}' | grep -oP '"\w+"(?=\s*:)' | sort | uniq
```

The field names are:

```
"bytes"
"dst_host"
"event_type"
"ip_dst"
"ip_proto"
"ip_src"
"packets"
"port_dst"
"port_src"
"src_host"
"timestamp_end"
"timestamp_start"
```

#### Question 6
*Which event_source is related to email traffic?*
> SnowGlowMailPxy


Similarly to Question 1, we get all the `APP-NAME` values:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | cut -d' ' -f4 | sort | uniq
```

The values are:

```
AuthLog
GreenCoat
NetflowPmacct
SnowGlowMailPxy
WindowsEvent
```

#### Question 7
*Looking at the event source from the last question, what is the name of the field that contains the actual email text?*
> Body

Similarly to Questions 3 and 5, we get Syslog messages where the `APP-NAME` is `SnowGlowMailPxy`. Next we get all the distinct field names  from the `JSON-STRUCTURED-DATA`:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}SnowGlowMailPxy\b' | grep -oP '\{.*?\}' | grep -oP '"\w+"(?=\s*:)' | sort | uniq
```

#### Question 8
*Using the 'GreenCoat' event_source, what is the only value in the hostname field?*
> SecureElfGwy

Similarly to Questions 3, 5, and 7, we get Syslog messages where the `APP-NAME` is `GreenCoat`. Next we get the hostname field:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}GreenCoat\b' | cut -d' ' -f3 | sort | uniq
```

#### Question 9
*Using the 'GreenCoat' event_source, what is the name of the field that contains the site visited by a client in the network?*
> url

Similarly to Questions 3 and 5, we get Syslog messages where the `APP-NAME` is `GreenCoat`. Next we get all the distinct field names from the `JSON-STRUCTURED-DATA`:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}GreenCoat\b' | grep -oP '\{.*?\}' | grep -oP '"\w+"(?=\s*:)' | sort | uniq
```

The field names are:

```
"additional_info"
"host"
"http_protocol"
"ip"
"method"
"protocol"
"response_size"
"status_code"
"timestamp"
"url"
"user_identifier"
```

#### Question 10
*Using the 'GreenCoat' event_source, which unique URL and port (URL:port) did clients in the TinselStream network visit most?*
> pagead2.googlesyndication.com:443

Similarly to Questions 8 and 9, we get Syslog messages where the `APP-NAME` is `GreenCoat`. Next we extract and count the unique URLs. Lastly we get the most visited URL:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}GreenCoat\b' | grep -oP '"url": "[^"]*"' | sort | uniq -c | sort -k1,1rn | head -n 1
```

#### Question 11
*Using the 'WindowsEvent' event_source, how many unique Channels is the SIEM receiving Windows event logs from?*
> 5

Similarly to the above questions, we get Syslog messages where the `APP-NAME` is `WindowsEvent`. Next we get the unique Channels:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep -oP '"Channel": "[^"]*"' | sort | uniq | wc -l
```

#### Question 12
*What is the name of the event.Channel (or Channel) with the second highest number of events?*
> Microsoft-Windows-Sysmon/Operational

Similarly to Question 4, we get Syslog messages where the `APP-NAME` is `WindowsEvent`. Next we get and count the occurrences of the unique Channels:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep -oP '"Channel": "[^"]*"' | sort | uniq -c | sort -k1,1rn | head -n 2 | tail -n 1
```

#### Question 13
*Our environment is using Sysmon to track many different events on Windows systems. What is the Sysmon Event ID related to loading of a driver?*
> 6

#### Question 14
*What is the Windows event ID that is recorded when a new service is installed on a system?*
> 4697

#### Question 15
*Using the WindowsEvent event_source as your initial filter, how many user accounts were created?*
> 0

Similarly to the above questions, we get Syslog messages where the `APP-NAME` is `WindowsEvent` and the `EventID` is `4720` (which correspond to a user account creation):

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep '"EventID": 4720' | wc -l
```

---

### Gold Solution (Partial)
#### Question 1
*What is the event.EventID number for Sysmon event logs relating to process creation?*
> 1

#### Question 2
*How many unique values are there for the 'event_source' field in all of the logs?*
> 5

We reuse our answer from Silver Question 1.

```bash
$ cat log_chunk_1.log  log_chunk_2.log | cut -d' ' -f4 | sort | uniq | wc -l
```

#### Question 3
*What is the event_source name that contains the email logs?*
> SnowGlowMailPxy

We reuse our answer from Silver Question 6.

#### Question 4
*The North Pole network was compromised recently through a sophisticated phishing attack sent to one of our elves. The attacker found a way to bypass the middleware that prevented phishing emails from getting to North Pole elves. As a result, one of the Received IPs will likely be different from what most email logs contain. Find the email log in question and submit the value in the event 'From:' field for this email log event.*
> kriskring1e@northpole.local

First we find all the distinct Received IPs and count them:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}SnowGlowMailPxy\b' | grep -oE '"ReceivedIP[12]": "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+"' |  awk -F': "' '{print $2}' | tr -d '",' | sort | uniq -c | sort -k1,1n | head -n 1 | grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+'
```

The IP `34.30.110.62` only appears in one email, so we get `From` field from this email:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}SnowGlowMailPxy\b' | grep -E '"ReceivedIP[12]": "34\.30\.110\.62"' | grep -oP '"From": "[^"]*"'
```

#### Question 5
*Our ElfSOC analysts need your help identifying the hostname of the domain computer that established a connection to the attacker after receiving the phishing email from the previous question. You can take a look at our GreenCoat proxy logs as an event source. Since it is a domain computer, we only need the hostname, not the fully qualified domain name (FQDN) of the system.*
> SleighRider

First we get the URL From the body of the phishing email:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}SnowGlowMailPxy\b' | grep -E '34\.30\.110\.62' | grep -oP '"Body": "[^"]*"'
```

Next we use the URL to search the GreenCoat proxy logs:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}GreenCoat\b' | grep -E 'http://hollyhaven.snowflake/howtosavexmas\.zip' | grep -oP '"host": "[^"]*"'
```

#### Question 6
*What was the IP address of the system you found in the previous question?*
> 172.24.25.12

```bash
4 cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}GreenCoat\b' | grep -E 'http://hollyhaven.snowflake/howtosavexmas\.zip' | grep -oP '"ip": "[^"]*"'
```

#### Question 7
*A process was launched when the user executed the program AFTER they downloaded it. What was that Process ID number (digits only please)?*
> 10014

First we get the time that the program was downloaded:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}GreenCoat\b' | grep -E 'http://hollyhaven.snowflake/howtosavexmas\.zip' | cut -d' ' -f2
```

Next we search for events on after the program was downloaded containing the name of the program:
 
```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | awk '$1 >= "2024-09-15T10:36:26-04:00"' | grep 'howtosavexmas' | head -n 1 | grep -oP '"ProcessID": [0-9]+'
```

#### Question 8
*Did the attacker's payload make an outbound network connection? Our ElfSOC analysts need your help identifying the destination TCP port of this connection.*
> 8443

We get the Syslog messages with an `EventID` of `5156` (which corresponds to a TCP connection) from after the user executed the program:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep 'howtosavexmas' | grep -A 99999 '"ProcessID": 10014,' | grep '"EventID": 5156,' | grep -oP '"NetworkInformation_DestinationPort": [0-9]+'
```

#### Question 9
*The attacker escalated their privileges to the SYSTEM account by creating an inter-process communication (IPC) channel. Submit the alpha-numeric name for the IPC channel used by the attacker.*
> ddpvccdbr

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep "pipe" | grep -oP '"ServiceName": "[^"]*"'
```

#### Question 10
*The attacker's process attempted to access a file. Submit the full and complete file path accessed by the attacker's process.*
> C:\Users\elf_user02\Desktop\kkringl315@10.12.25.24.pem

First we get the process IDs corresponding to the IPC:

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep "ddpvccdbr" | grep -oP '"ProcessID": \d+' | sort | uniq
```

Next we search entries with an EventID of 4663 (corresponds to file access event):

```bash
$ cat log_chunk_1.log  log_chunk_2.log | grep -E '^([^ ]+ +){3}WindowsEvent\b' | grep -E '"ProcessID": 10014,' | grep -E '"EventID": 4663,' | grep -E '"ObjectType": "File"' | grep -oP '"ObjectName": "[^"]*"'
```

Note: the file path in the log has escaped characters `\\`

---