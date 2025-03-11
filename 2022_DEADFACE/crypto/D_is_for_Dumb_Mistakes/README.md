### "D" IS FOR DUMB MISTAKES
To show off their 1337 programming skills, DEADFACE attempted to create their own encryption process to help them communicate privately. Although the encryption process is working, the decryption process is flawed. The De Monne security team was able to find DEADFACE's code and can see that they are trying to use the RSA algorithm with these variables:

- Prime numbers of $1049$ and $2063$
- Exponent of $777887$

Recompute the decryption key ($d$) and submit the flag as $flag(d-VALUE)$

---

#### Deriving $d$
Suppose we have an RSA Cryptosystem, the key generation function selects keys $e,d$ where the following property holds:

> $ed \equiv 1 \pmod{\phi(N)}$

<br>

Additionally, since $e$ is necessarily coprime to $\phi(N)$, the following property holds:

> $
d \equiv e^{-1} \pmod{\phi(N)}
$

<br>

Lastly, since $p$ and $q$ are distinct primes, the following property holds:

> $
d \equiv e^{-1} \pmod{(p-1)(q-1)}
$

---

### Computing $d$
First we calculate $phi(n)$:

````Python
# soln.py
phi = (p-1)*(q-1)
````

<br>

Next since $phi(n)$ is relatively small, we use can brute force to get $d$:

````Python
# soln.py
for d in range(0,phi):

    if (d*e)%phi == 1:
        print(d)
        break
````

---

#### Flag
> flag{d=1457215}

---