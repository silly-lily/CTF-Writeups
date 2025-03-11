### Yors-Truly
I have encrypted some text but it seems I have lost the key! Can you find it?

Challenge Files: [yors-truly.py](yors-truly.py)

---

#### Encryption

Looking at the challenge file, the plaintext is XORed with the key and then base64 encoded to make the ciphertext:

```Python
# yors-truly.py
ciphertext_b64 = base64.b64encode(byte_xor(key.encode(), plaintext.encode()))

ciphertext_decoded = base64.b64decode("NkMHEgkxXjV/BlN/ElUKMVZQEzFtGzpsVTgGDw==")
```

---

#### Deriving The Key

We can use the properties of XOR to manipulate the ciphertext equation to solve for the key:

```math
\begin{alignedat}{2}
&ct = key \oplus pt\\
&ct \oplus key = (key \oplus) pt \oplus key\\
&ct \oplus key = (pt \oplus key) \oplus key\\
&ct \oplus key = pt \oplus (key \oplus key)\\
&ct \oplus key = pt \oplus 0\\
&ct \oplus key = pt\\
&(ct \oplus key) \oplus ct = pt \oplus ct\\
&(key \oplus ct) \oplus ct = pt \oplus ct\\
&key \oplus (ct \oplus ct) = pt \oplus ct\\
&key \oplus 0 = pt \oplus ct\\
&key = pt \oplus ct\\
\end{alignedat}
```

---

#### Computing the Key

We XOR the ciphertext with the plaintext to get the key:

```python
# yors-truly.py
key = byte_xor(ciphertext_decoded, plaintext.encode())
key = key.decode()
print(key)
```

---

## Flag
> wctf{X0R_i5_f0rEv3r_My_L0Ve}

---