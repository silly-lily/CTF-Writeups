### Santa Vision
Alabaster and Wombley have poisoned the Santa Vision feeds! Knock them out to restore everyone back to
their regularly scheduled programming.<br><br>
Solved: A, B, C

---

***Ribb Bonbowford***
> Hi, Ribb Bonbowford here, ready to guide you through the SantaVision dilemma!
The Santa Broadcast Network (SBN) has been hijacked by Wombley's goons—they're using it to spread
propaganda and recruit elves! And Alabaster joined in out of necessity. Quite the predicament, isn’t it?<br><br>
To access this challenge, use this terminal to access your own instance of the SantaVision infrastructure.<br><br>
Once it's done baking, you'll see an IP address that you'll need to scan for listening services.
Our target is the technology behind the SBN. We need make a key change to its configuration.<br><br>
We’ve got to remove their ability to use their admin privileges. This is a delicate maneuver—are you ready?<br><br>
We need to change the application so that multiple administrators are not permitted. A misstep could
cause major issues, so precision is key.<br><br>
Once that’s done, positive, cooperative images will return to the broadcast. The holiday spirit must prevail!<br><br>
This means connecting to the network and pinpointing the right accounts. Don’t worry, we'll get through this.<br><br>
Let’s ensure the broadcast promotes unity among the elves. They deserve to see the season’s spirit, don't you think?<br><br>
Remember, it’s about cooperation and togetherness. Let's restore that and bring back the holiday cheer.<br><br>
Best of luck!

---

### Hints

***Filesystem Analysis***<br>
From: Ribb Bonbowford<br>
[jefferson](https://github.com/onekey-sec/jefferson/) is great for analyzing JFFS2 file systems.

***Database Pilfering***<br>
From: Ribb Bonbowford<br>
Consider checking any database files for credentials...

***Misplaced Credentials***<br>
From: Ribb Bonbowford<br>
See if any credentials you find allow you to subscribe to any [MQTT](https://en.wikipedia.org/wiki/MQTT) feeds.

***Looking Deeper***<br>
From: Ribb Bonbowford<br>
Discovering the credentials will show you the answer, but will you see it?

---

### Santa Vision A
*What username logs you into the SantaVision portal?*
> elfanon

First we use Nmap to discover open ports:

```bash
$ nmap -Pn -p- {TARGET IP}
```

We find that port 8000 has a website:

```
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-01-10 23:57 EST
Nmap scan report for 184.105.29.34.bc.googleusercontent.com (34.29.105.184)
Host is up (0.062s latency).
Not shown: 65521 closed tcp ports (conn-refused)
PORT     STATE    SERVICE
22/tcp   open     ssh
25/tcp   filtered smtp
80/tcp   filtered http
135/tcp  filtered msrpc
136/tcp  filtered profile
137/tcp  filtered netbios-ns
138/tcp  filtered netbios-dgm
139/tcp  filtered netbios-ssn
443/tcp  filtered https
445/tcp  filtered microsoft-ds
1883/tcp open     mqtt
5355/tcp filtered llmnr
8000/tcp open     http-alt
9001/tcp open     tor-orport

Nmap done: 1 IP address (1 host up) scanned in 107.82 seconds
```

Visiting the website on port 8000, we reach a login page. Looking at the website's underlying source code, we see a comment in the credentials.

```html
<!-- mqtt: elfanon:elfanon -->
```

---

### Santa Vision B
*Once logged on, authenticate further without using Wombley's or Alabaster's accounts to see the
northpolefeeds on the monitors. What username worked here?*
> elfmonitor

We log into the website using the credentials we found in the comments. We click the "Available Clients" Button and see that they are "elfmonitor", "WomblyC", and "AlabasterS".

---

### Santa Vision C
*Using the information available to you in the SantaVision platform, subscribe to the frostbitfeed MQTT topic. Are there any other feeds available? What is the code name for the elves' secret operation?*
> Idemcerybu

Visiting the website on port 8000, the login page says "topic 'sitestatus' available" at the bottom. We subscribe to the public MQTT sitestatus topic:

```
Host: ws://{IP ADDR}
Port: 9001
Client ID: elfmonitor-ClientId-viewer
Path: /mqttPub
Username: elfanon
Password: elfanon
```

We see the message:

```
File downloaded: /static/sv-application-2024-SuperTopSecret-9265193/applicationDefault.bin
```

We download the .bin file using the url from the message. Next we extract the file contents using jefferson:

```bash
$ jefferson applicationDefault.bin -d applicationDefault
```

We find the MQTT username and password hardcoded into the views.py file:

```python
# applicationDefault\app\src\core\views.py
auth={ 'username':"SantaBrokerAdmin", 'password':"8r0k3R4d1mp455wD" }
```

We subscribe to all the MQTT topics by using a `#`:

```
Host: ws://{IP ADDR}
Port: 9001
Client ID: elfmonitor-ClientId-viewer
Path: /mqtt
Username: SantaBrokerAdmin
Password: 8r0k3R4d1mp455wD
```

Looking at the santafeed, we see the message:

```
Sixteen elves launched operation: Idemcerybu
```
---