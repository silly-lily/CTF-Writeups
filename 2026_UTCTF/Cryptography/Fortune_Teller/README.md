### Fortune Teller
Our security team built a "cryptographically secure" random number generator. The lead engineer assured us it was basically AES. He has since been let go. By Garv (@GarvK07 on discord)

Challenge Files: [lcg.txt](lcg.txt)

---

#### Solving for $a$
We have $x_{n+1} = (a * x_{n} + c) \mod m$. Now let $d_{n}$ be the difference between $x_{n+1}$ and $x_{n}$. Then we have:

$
d_{2} = x_{3}-x_{2} \mod m\\
d_{2} = (a * x_{2} + c)-(a * x_{n} + c) \mod m\\
d_{2} = a * x_{2} + c-a * a * x_{1} - c \mod m\\
d_{2} = a * x_{2}-a * a * x_{1} +c - c \mod m\\
d_{2} = a * x_{2}-a * a * x_{1} \mod m\\
d_{2} = a(x_{2}-x_{1}) \mod m\\
d_{2} = a*d_{1} \mod m
$

Now solving for $a$, we have:

$
a = d_{2}*d_{1}^{-1} \mod m\\
a = (x_{3}-x_{2})*(x_{2}-x_{1})^{-1} \mod m\\
a = (1541137174-2681459949)*(2681459949-4176616824)^{-1} \mod 2^{32}\\
a = (-1140322775)*(-1495156875)^{-1} \mod 2^{32}\\
a = 3355924837
$

---

#### Solving for $c$
We have $x_{n+1} = (a * x_{n} + c) \mod m$. Therefore $x_{2} = (a * x_{1} + c) \mod m$. Solving for $c$, we have: 

$
c = x_{2}-a*x_{1} \mod m\\
c = 2681459949-3355924837*4176616824 \mod 2^{32}\\
c = 2915531925
$

---
#### Computing $x_5$
Since $x_{n+1} = (a * x_{n} + c)$,  we have:

$
x_{5} = (a * x_{4} + c) \mod m\\
x_{5} = (3355924837 *3272915523 + 2915531925) \mod 2^{32}\\
x_{5} = 1233863684
$

---

#### Flag
> utflag{pr3d1ct_th3_futur3_lcg}

```python
# soln.py
d_2 = (x_3-x_2)%m
d_1 = (x_2-x_1)%m

a = (d_2*pow(d_1,-1,m))%m
c = (x_2-a*x_1)%m

x_5 = (a*x_4+c)%m


ct = '3cff226828ec3f743bb820352aff1b7021b81b623cff31767ad428672ef6'
ct = bytes.fromhex(ct)

key = x_5.to_bytes(4, "big")
key = key*((len(ct) + 3) // 4)

pt = bytes([c ^ k for c, k in zip(ct, key)])
pt = pt.decode()

print(pt)
```

---