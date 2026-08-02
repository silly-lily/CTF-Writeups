### No Laughing Matter
You see, that's not funny.

Challenge Files: [aha.txt](aha.txt)

---


#### Flag
> bronco{UFUNNYLMAOLOLXDIJBOLROFLHAHA}

The challenge file `aha.txt` contains a sequence of 8-character strings consisting of the characters `A` and `H`. Each 8-character string represents a single byte, where `A` corresponds to `0` and `H` corresponds to `1`. Interpreting each resulting 8-bit binary value as an ASCII byte reveals the flag:

```python
# soln.py
fp = open('aha.txt')
cts = fp.read().split()


pts = ''

for ct in cts:

    pt = ct.replace('A','0')
    pt = pt.replace('H','1')
    pts+=chr(int(pt,2))

print(pts)
```

---