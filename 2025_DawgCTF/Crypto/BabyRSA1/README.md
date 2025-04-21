### Baby RSA 1
You think your Algebra skills are pretty good huh? Well let's test it out.

Challenge Files: [source.py](source.py), [output.txt](output.txt)

---

#### Solving for $q$


We can use $x$ and $y$ to solve for $q$:

```math
\begin{alignedat}{2}
& x & = ap+bq\\
& y & = cp+dq\\
\end{alignedat}
```

We multiply $x$ by $c$ and $y$ by $a$:

```math
\begin{alignedat}{2}
& cx & = acp+bcq\\
& ay & = acp+adq\\\\
\end{alignedat}
```

Next we subtract the equations to remove the $p$ variable:

```math
\begin{alignedat}{1}
& cx-ay = acp-acp+bcq-adq\\
& cx-ay = bcq-adq\\
\end{alignedat}
```

Next we isolate the $q$ variable:

```math
\begin{alignedat}{1}
& bcq-adq = cx-ay\\
& q(bc-ad) = cx-ay\\
& q = \frac{cx-ay}{bc-ad}\\
\end{alignedat}
```

---

#### Solving for $p$

We solve $x$ for $p$:

```math
\begin{alignedat}{1}
& ap+bq = x\\
& ap = x-bq\\
& p = \frac{x-bq}{a}\\
\end{alignedat}
```

---

#### Deriving $d$

We can use primes $p$ and $q$ to compute $\phi(N)$

```math
\begin{alignedat}{1}
& \phi(N) = \phi(pq) = (p-1)(q-1)
\end{alignedat}
```

And we compute he decryption key $d$ by finding the inverse of $e$ modulo $\phi(N)$:

```math
\begin{alignedat}{1}
& ed = 1 \mod(\phi(N))\\
& d = e^{-1} \mod(\phi(N))\\
\end{alignedat}
```


---

#### Flag
> DawgCTF{wh0_s41d_m4th_15_us3l3ss?}


```python
# soln.py
q = (c*x-a*y)//(c*b-a*d)
p = (x-b*q)//a

phi = (p-1)*(q-1)

e = 0x10001

d = pow(e,-1,phi)

pt = pow(ct,d,N)
pt = long_to_bytes(pt)

print(pt.decode())
```

---