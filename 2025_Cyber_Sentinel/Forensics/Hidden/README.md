### Hidden in Plain Sight

Analysts recovered a suspicious image from a threat actor’s social media account. At first glance, it looks like an innocent selfie - but insider reports suggest that a flag might be hiding in the image metadata. Can you extract it?

Challenge Files: [selfie.png](selfie.png)

---

#### Flag
> C1{smile_youre_flagged}

We can use the `exiftool` to view the file metadata. The flag is the comment:

```bash
$ exiftool selfie.png
```

---