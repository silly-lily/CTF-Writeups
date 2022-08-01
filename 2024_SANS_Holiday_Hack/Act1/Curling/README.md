### cURLing
Team up with Bow Ninecandle to send web requests from the command line using Curl, learning how to interact directly with web servers and retrieve information like a pro!<br><br>
Solved: Silver, Gold

---

#### Hints
***cURL Manual***<br>
From: Bow Ninecandle<br>
The official [cURL man page](https://curl.se/docs/manpage.html) has tons of useful information on how to use cURL.

***cURL: Don't squash***<br>
From: Bow Ninecandle<br>
Take a look at cURL's "--path-as-is" option; it controls a default behavior that you may not expect!

---

***Bow Ninecandle***
> Well hello there! I'm Bow Ninecandle, bright as a twinkling star! Everyone's busy unpacking, but I've grown quite bored of that. Care to join me for a lovely game?<br><br>
Oh Joy! Today, We're diving into something delightful: the curling challenge—without any ice, but plenty of sparkle!<br><br>
No icy brooms here though! We're all about Curl, sending web requests from the command line like magic messages<br><br>
So, have you ever wielded Curl before? If not, no worries at all, my friend!<br><br>
It's this clever little tool that lets you whisper directly to web servers. Pretty neat, right?<br><br>
Think of it like sending secret scrolls through the interwebs, awaiting a wise reply!<br><br>
To begin, you can type something like curl https://example.com. Voilà! The HTML of the page appears, like conjuring a spell!<br><br>
Simple enough, huh? But oh, there's a whole world of magic you can cast with Curl!<br><br>
We're just brushing the surface here, but trust me—it’s a hoot and a half!<br><br>
If you get tangled up or need help, just give me a shout! I’m here to help you ace this curling spectacle.<br><br>
So, are you ready to curl those web requests like a pro? Let’s see your magic unfold!

---

#### Silver Solution

##### Challenge 1
*Unlike the defined standards of a curling sheet, embedded devices often have web servers on non-standard ports.  Use curl to retrieve the web page on host "curlingfun" port 8080.*

```bash
$ curl http://curlingfun:8080
```

##### Challenge 2
*Embedded devices often use self-signed certificates, where your browser will not trust the certificate presented.  Use curl to retrieve the TLS-protected web page at https://curlingfun:9090/*

```bash
$ curl --insecure https://curlingfun:9090
```

##### Challenge 3
*Working with APIs and embedded devices often requires making HTTP POST requests. Use curl to send a request to https://curlingfun:9090/ with the parameter "skip" set to the value "alabaster", declaring Alabaster as the team captain.*

```bash
$ curl --insecure -X POST --data "skip=alabaster" https://curlingfun:9090
```

##### Challenge 4
*Working with APIs and embedded devices often requires maintaining session state by passing a cookie.  Use curl to send a request to https://curlingfun:9090/ with a cookie called "end" with the value "3", indicating we're on the third end of the curling match*

```bash
$ curl --insecure -b "end=3" https://curlingfun:9090
```

##### Challenge 5
*Working with APIs and embedded devices sometimes requires working with raw HTTP headers.  Use curl to view the HTTP headers returned by a request to https://curlingfun:9090/*

```bash
$ curl --insecure -I https://curlingfun:9090
```

##### Challenge 6
*Working with APIs and embedded devices sometimes requires working with custom HTTP headers.  Use curl to send a request to https://curlingfun:9090/ with an HTTP header called "Stone" and the value "Granite".*
```bash
$ curl --insecure --header "Stone: Granite" https://curlingfun:9090
```

##### Challenge 7
*curl will modify your URL unless you tell it not to.  For example, use curl to retrieve the following URL containing special characters: https://curlingfun:9090/../../etc/hacks*

```bash
$ curl --insecure "https://curlingfun:9090/%2E%2E/%2E%2E/etc/hacks"
```

---

***Bow Ninecandle***
> Bravo! Look at you, curling through that like a true web wizard!<br><br>
You zipped through that challenge faster than a curling stone on enchanted ice!

---

#### Gold Solution
In the home directory of the terminal, there is a file `HARD-MODE.txt`. We can use the `cat` command to view its contents:

```
Prefer to skip ahead without guidance? Use curl to craft a request meeting these requirements:

- HTTP POST request to https://curlingfun:9090/
- Parameter "skip" set to "bow"**
- Cookie "end" set to "10"**
- Header "Hack" set to "12ft"**
```

##### Command 1
We use curl to craft a request meeting the above requirements:

```bash
$ curl --insecure --header "Hack: 12ft" -b "end=10" --data "skip=bow" https://curlingfun:9090/
```

##### Command 2
*Excellent!  Now, use curl to access this URL: https://curlingfun:9090/../../etc/button*

```bash
$ curl --insecure https://curlingfun:9090/%2E%2E/%2E%2E/etc/button
```

##### Command 3
*Great!  Finally, use curl to access the page that this URL redirects to: https://curlingfun:9090/GoodSportsmanship*

We use the `IL` flag to get the HTTP 301 Redirect Response:

```bash
$ curl --insecure -IL https://curlingfun:9090/GoodSportsmanship
```

We look at the `Location` header to get the url:

```bash
$ curl --insecure https://curlingfun:9090/SpiritOfCurling.php
```

---

***Bow Ninecandle***
> Wait... did you just<br><br> slice and dice it all into three commands? My stars, you're a Curling conjurer!

---