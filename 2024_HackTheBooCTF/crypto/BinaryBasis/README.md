# Binary Basis
Binary Basis is a crypto challenge focusing on RSA with multiple primes. We are given the values of $n$, $e$, $c$ and an additional $treat$ variable in `output.txt`. Additionally, we are given `source.py` which is the algorithm that was used to make the `output.txt` file.

## Factoring n
Looking at the challenge files, we see $n$ is the product of 16 primes $p_{0},..,p_{15}$, $e$ is the encryption key, and $c$ is the encrypted flag:

```python
# source.py
FLAG = open('flag.txt', 'rb').read()

primes = [getPrime(128) for _ in range(16)]

n = prod(primes)
e = 0x10001
m = bytes_to_long(FLAG)
c = pow(m, e, n)
```

We can make the equations:
```math
n = p_{0}...p_{15}\\
e = 0x10001\\
c = m^e \pmod{n}\\
```

Additionally, we see that the $treat$ variable is a calculation using the primes:

```python
# source.py
treat = sum([primes[i]*2**(4919-158*(2*i+1)) for i in range(16)])
```

We can make an equation for $treat$ which is the sum of primes each with increasing coefficient powers of $2$:

```math
treat = \sum_{i=0}^{15}2^{4919-158*(2*i+1)}p_{i}
treat = \sum_{i=0}^{15}2^{4919-158*(2*i+1)}p_{i}\\
treat = 2^{4919-158*(2*15+1)}+p_{15}+2^{4919-158*(2*14+1)}p_{14}+..+2^{4919-158*(2*14+1)}p_{15}\\
treat = 2^{21}p_{15}+2^{337}p_{14}+..+2^{4761}p_{15}\\
```

Now if we divide by the coefficient power in front of $p_{15}$, we can recover $p_{15}$:

```math
treat = 2^{21}p_{15}+2^{337}p_{14}+..+2^{4761}p_{0}\\
treat = 2^{21}[p_{15}+2^{316}p_{14}+..+2^{4740}p_{0}]\\
\frac{treat}{2^{21}} = p_{15}+2^{316}p_{14}+..+2^{4740}p_{0}\\
p_{15} \equiv \frac{treat}{2^{21}} \equiv p_{15}+2^{316}p_{14}+..+2^{4740}p_{15} \equiv p_{15}+0*p_{14}+..+0*p_{15} \pmod{2^{316}}
```

We update treat by dividing by $2^{21}$ and subtracting by $p_{15}$:
```math
treat = 2^{21}p_{15}+2^{337}p_{14}+..+2^{4761}p_{0}\\
treat := \frac{treat}{2^{21}}-p_{15} = 2^{337}p_{14}+..+2^{4761}p_{0}\\
```

Now we can recover $p_{14}$ the same way we recovered $p_{15}$. We repeat this process until we have recovered all the primes: 
```python
# soln.py
acc = 0
primes = []
for i in range(15,-1,-1):
    
    power = 0x1337-158*(2*i+1)
    adjusted_power = power-acc
    adjusted_multiple = int(2**adjusted_power)
  
    treat = treat//adjusted_multiple
    acc+=adjusted_power
    
    next_power = 0x1337-158*(2*(i-1)+1)
    adjusted_next_power = next_power-acc
    adjusted_next_multiple = int(2**adjusted_next_power)

    prime = treat%adjusted_next_multiple
    treat-=prime
    primes.append(prime)
```

## Flag
> HTB{hiding_primes_in_powers_of_two_like_an_amateur}

After recovering the primes, we can compute the decryption key $d \equiv e^{-1} \pmod{phi(n)}$. Since $n = p_0...p_{15}$ for primes $p_i$, $phi(n) = (p_0-1)...(p_{15}-1)$. Now we can decrypt $c$:

```math
m \equiv c^d \pmod{n}\\
m \equiv (m^{e})^d \pmod{n}\\
m \equiv m^{ed} \pmod{n}
```

By definition of mod:
```math
m \equiv m^{ed} \pmod{n}\\
m \equiv (m^{x*phi(n)+1}) \pmod{n}
```

Since $m$ and $n$ are coprime, by Euler's theorem:
```math
m \equiv m*m^{x*phi(n)} \pmod{n}\\
m \equiv m*m^{x*phi(n)} \pmod{n}\\
m \equiv m*(m^{(phi(n))^{x}}) \pmod{n}\\
m \equiv m*(1^{x}) \pmod{n}\\
m \equiv m \pmod{n}
```

We convert $m$ to bytes and decode to get the flag:

```python
# soln.py
phi = prod([prime-1 for prime in primes])
d = inverse(e,phi)
m = pow(c,d,n)
m = long_to_bytes(m).decode()
print(m)
```