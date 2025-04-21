### RSA
Idk why people make e so large for rsa... it's so much easier to just use 3. Why use big number when small number do trick?

Challenge Files: [rsa.txt](rsa.txt)

---

#### Unpadded RSA Encryption Attack
In an RSA Cryptosystem, the encryption formula is:

```math
c \equiv m^{e} \pmod{n}
```

If the special condition $m^{e} < n$ is satisfied, we have:

```math
c = m^{e}
```

And it follows that:

```math
m = c^{\frac{1}{e}}
```

---

#### Flag
> utflag{hmm_maybe_bad_idea}


Since the special condition $m^{3} < c$ is satisfied, we compute $m = c^{\frac{1}{3}}$ to get the flag:

```python
# soln.py
m = nth_root(c,3)
m = m.to_bytes((m.bit_length() + 7) // 8, byteorder='big').decode('utf-8')
print(m)
```

---