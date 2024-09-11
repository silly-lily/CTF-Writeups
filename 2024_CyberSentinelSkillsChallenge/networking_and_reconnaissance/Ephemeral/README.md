# Ephemeral
Ephemeral is a networking and reconnaissance challenge where we need to find the flag which is hosted on a non-standard port.

# Nmap
First we use Nmap with the `-p-` flag to scan all of `34.31.144.172` ports:
```
nmap -Pn -p- 34.31.144.172
```
```
Starting Nmap 7.92 ( https://nmap.org ) at 2024-05-18 14:37 Eastern Daylight Time
Nmap scan report for 172.144.31.34.bc.googleusercontent.com (34.31.144.172)
Host is up (0.050s latency).
Not shown: 65530 filtered tcp ports (no-response)
PORT      STATE  SERVICE
22/tcp    open   ssh
1194/tcp  closed openvpn
3389/tcp  closed ms-wbt-server
8000/tcp  closed http-alt
51147/tcp open   unknown
```

# Flag
> C1{ch3ck_4ll_p0rts!}

We see that there is a service running on non-standard port 51147. We use Netcat to interact with this port:
```
nc 34.31.144.172 51147
```
```
You found me! Your flag is:

C1{ch3ck_4ll_p0rts!}
```