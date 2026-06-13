### No 7race
Can you recover what was lost?

Challenge Files: [challenge.py](challenge.py)

---

#### Converting $a,b$ to decimal

From `challenge.py`, we have that $a$ is the integer representation of the flag, $b$ is the result of shifting $a$ left by $77777$ bits, and that the last $155$ digits of $b$ match the suffix $S = 03081...$:

```
# challenge.py
a = int.from_bytes(open("flag.txt","rb").read(), byteorder='big')

b = a << 77777
b = str(b)
if not b.endswith('03081127692533913997381228658418928780421416188103339458770036280397929450297959557812089439331054492922876854076547798835969658432397983993314299716042752'):
    exit()
```


Now let the binary representation of $a$ be:

$$
(a_{k}a_{k-1}...a_{0})_{2}
$$

Now to convert $(a)_{2}$ to decimal, we have:


$$
a = a_{k}*2^{k-1}+...+a_0*2^{0}
$$


Since $b$ is the result of shifting $a$ left by $77777$ bits, the binary representation of $b$ is:

$$
(b)_{2} = (a_{k}a_{k-1}...a_{0}\underbrace{0 \dots 0}_{77777})_{2}
$$

Now to convert $(b)_{2}$ to decimal, we have:


```math
\begin{alignedat}{2}
&b = a_{k}*2^{k-1+77777}+...+a_0*2^{77777}+0*2^{77776}+...+0*2^{0}\\
&b = a_{k}*2^{k-1+77777}+...+a_0*2^{77777}\\
&b = a_{k}*2^{k-1}*2^{77777}+...+a_0*2^{0}*2^{77777}\\
&b = 2^{77777}*(a_{k}*2^{k-1}+...+a_0*2^{0})\\
&b = 2^{77777}*a\\
\end{alignedat}
```

---

#### Suffix $S$
Now since the last $155$ digits of $b$ match the suffix $S$, we can rewrite $b$ in terms of $S$ where $P$ is the unknown higher part of $b$:

$$
b = P*10^{155}+S
$$

---

#### Solving for $a$

Now we can combine our equations for $b$:

```math
\begin{alignedat}{2}
&b = a*2^{77777} = P*10^{155}+S\\
&b \equiv a*2^{77777} \equiv P*10^{155}+S \pmod{10^{155}}\\
&b \equiv a*2^{77777} \equiv 0+S \pmod{10^{155}}\\
&b \equiv a*2^{77777} \equiv S \pmod{2^{155}*5^{155}}\\
\end{alignedat}
```

Now by the Chinese Remainder Theorem this is equivalent to the system:

```math
\begin{alignedat}{2}
&S \equiv a*2^{77777} \pmod{2^{155}}\\
&S \equiv a*2^{77777} \pmod{5^{155}}\\
\end{alignedat}
```

Since $2^{77777} = 2^{77622}*2^{155}$, for the first equation we have: $S \equiv 0 \pmod{2^{155}}$. Lastly, solving for $a$ we have:

```math
\begin{alignedat}{2}
&S \equiv a*2^{77777} \pmod{5^{155}}\\
&a \equiv S*2^{-77777} \pmod{5^{155}}\\
\end{alignedat}

```
---

#### Flag
> THEM?!CTF{NUMB3R_TH30R3M_1S_FUN}


```python
# soln.py
S = int('03081127692533913997381228658418928780421416188103339458770036280397929450297959557812089439331054492922876854076547798835969658432397983993314299716042752')



m5 = 5**155

inv_2 = pow(2, -1, m5)  # modular inverse mod 5^155
a = (S % m5) * pow(inv_2, 77777, m5) % m5

flag = a.to_bytes((a.bit_length()+7)//8, 'big')
print(flag.decode())
```

---