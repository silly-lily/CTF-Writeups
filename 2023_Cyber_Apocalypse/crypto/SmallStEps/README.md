### Small StEps
As you continue your journey, you must learn about the encryption method the aliens used to secure their communication from eavesdroppers. The engineering team has designed a challenge that emulates the exact parameters of the aliens’ encryption system, complete with instructions and a code snippet to connect to a mock alien server. Your task is to break it.

Challenge Files: [README.md](challenge.md), [server.py](server.py), [solver.py](solver.py)

---

#### Encryption
In addition to the challenge files, we are also provided with the IP address and port of a server. The `server.py` file contains the code running on the server. Looking at `server.py`, we see that the server uses RSA Encryption to encrypt the flag. Then it sends the encrypted flag and corresponding values of `n` and `e`, which were used in the encryption process:

````Python 
# server.py main()
if choice == 'E':
    encrypted_flag = rsa.encrypt(FLAG)
    print(f'\nThe public key is:\n\nN: {rsa.n}\ne: {rsa.e}\n')
    print(f'The encrypted flag is: {encrypted_flag}\n')
````

Looking at the encryption scheme, the values of `p` and `q` are random 256-bit primes and the encryption key `e` is `3`.

```python
# server.py main()
class RSA:

    def __init__(self):
        self.q = getPrime(256)
        self.p = getPrime(256)
        self.n = self.q * self.p
        self.e = 3

    def encrypt(self, plaintext):
        plaintext = bytes_to_long(plaintext)
        return pow(plaintext, self.e, self.n)
```

---

#### Query
We a query to the server to get the values of the encrypted flag and `n`:

````
$ nc {IP ADDR} {PORT}
This is the second level of training.

[E]ncrypt the flag.
[A]bort training.

> e

The public key is:

N: 6215697611195473204835152963731112656158349850497460907641005195184366257194698777539738727164605273012304297042794276422202255193336681304789935360109927
e: 3

The encrypted flag is: 70407336670535933819674104208890254240063781538460394662998902860952366439176467447947737680952277637330523818962104685553250402512989897886053
````

---

#### Decryption 
Since `e` is relatively small (`m^e < n`), the cube root of the encrypted flag modulo `n` is equivalent to the cube root of the encrypted flag itself. 

We compute the cube root of the encrypted flag from our query using binary search:

````Python
# soln.py
low = 0
high = ct

mid = (low+high)//2
mid3 = mid**3
        
while mid3 != ct:

    mid = (low+high)//2
    mid3 = mid**3
            
    if mid3 < ct: 
        
        low = mid+1
    
    elif mid3 > ct: 

        high = mid-1

m = mid
````

---

#### Flag
> HTB{5ma1l_E-xp0n3nt}

After finding the cube root, we convert the message to bytes and decode it to retrieve the flag:

````Python
# soln.py
m = long_to_bytes(m)
m = m.decode()

print(m)
````

---