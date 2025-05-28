### Rotten
PVG{LxxdJwAXJGcsDoncKfRctddA}

---

#### Deriving the key

The ciphertext was encrypted using the caesar cipher: 

```math
\begin{alignedat}{2}
& ct_i := pt_{i}+k \pmod{26}
\end{alignedat}
```

Since we know that the flag format is `CIT{...}`, we can subtract the first letter of the ciphertext with the first letter of flag to compute the key:

```math
\begin{alignedat}{2}
& ct_0-pt_{0} = (pt_{0}+k)-pt_{0} = k \pmod{26}
\end{alignedat}
```

#### Decryption

To decrypt, we subtract the ciphertext with the key to get the flag:

```math
\begin{alignedat}{2}
& pt_{i} := ct_{i}-k \pmod{26}
\end{alignedat}
```

---

#### Flag
> CIT{YkkqWjNKWTpfQbapXsEpgqqN}


To decrypt, each character was first converted to its alphabet index using `ord()`, the shift was reversed, and then it was converted back to a letter using `chr()`:

```python
# soln.py
ascii_val = ord(c.upper())
c_val = ascii_val-ord('A')

new_c_val = (c_val-key)%26
new_ascii_val = (c_val-key)%26+ord('A')

new_c = chr(new_ascii_val)
```

---