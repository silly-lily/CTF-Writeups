### DCΔ
Due to a national shortage of primes, the US Department of Agriculture is rationing all citizens to a limit of one generated prime number per CTF challenge.

Challenge Files: [rsa.txt](rsa.txt)

---

#### Factoring n

In an RSA Cryptosystem, the encryption formula is:

```math
c \equiv m^{e} \pmod{n}
```

If the special condition $n = p^{2}$ is satisfied, we have:

```math
\phi(n) = \phi(p^{2}) = p^{2}-p^{2-1} = p^{2}-p = p(p-1)
```

Now to compute the decryption key we have:

```math
\begin{alignedat}{2}
d \equiv e^{-1} \pmod{p(p-1)}
\end{alignedat}
```

And since $p$ and $p-1$ are relatively prime, we can use the Chinese Remainder Theorem to find a $d$ that satisfies the system of congruences:

```math
\begin{alignedat}{2}
&d \equiv d_p \pmod{p}\\
&d \equiv d_{p-1} \pmod{p-1}
\end{alignedat}
```

Now do decrypt we have:

```math
m = c^{d} \pmod{n}
```

---


#### Flag
> utflag{th3_t0t13nt_funct10n_uns1mpl1f13d}


```python
# soln.py
p = nth_root(n,2)
phi = p*(p-1)

d1 = mod_inverse(e,p)
d2 = mod_inverse(e,p-1)
d = chinese_remainder_theorem([d1,d2],[p,p-1])

m = pow(c,d,n)
```

---