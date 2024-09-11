# Small StEps
Small StEps is a crypto challenge focusing on RSA. We are given an encrypted flag and an encryption scheme and need to decrypt the flag.

# Encryption
We notice that the encryption algorithm used is RSA with `e=3`, `p` and `q` being randoms, and `n=pq`.

````Python 
class RSA:

    def __init__(self):
        self.q = getPrime(256)
        self.p = getPrime(256)
        self.n = self.q * self.p
        self.e = 3

    def encrypt(self, plaintext):
        plaintext = bytes_to_long(plaintext)
        return pow(plaintext, self.e, self.n)
````

# Query
We run `nc 178.62.9.10 30705` to interact with the server. We make three queries to the server and notice that `e = 3` and `ct=70407336670535933819674104208890254240063781538460394662998902860952366439176467447947737680952277637330523818962104685553250402512989897886053` every time, but `N` changes.

````
$ nc 178.62.9.10 30705
This is the second level of training.

[E]ncrypt the flag.
[A]bort training.

> e

The public key is:

N: 7553724917178776446351158413775481699655359242186469122936217179893107586932408504417037444253401210131378477132162160534902516763621008292182841879647607
e: 3

The encrypted flag is: 70407336670535933819674104208890254240063781538460394662998902860952366439176467447947737680952277637330523818962104685553250402512989897886053

[E]ncrypt the flag.
[A]bort training.

> e

The public key is:

N: 9756356874393608249219339320659145719762485347145099691393522316929446421883837320384906774254392092452920566386614816899595395452282652054778777124924459
e: 3

The encrypted flag is: 70407336670535933819674104208890254240063781538460394662998902860952366439176467447947737680952277637330523818962104685553250402512989897886053

[E]ncrypt the flag.
[A]bort training.

> e

The public key is:

N: 6215697611195473204835152963731112656158349850497460907641005195184366257194698777539738727164605273012304297042794276422202255193336681304789935360109927
e: 3

The encrypted flag is: 70407336670535933819674104208890254240063781538460394662998902860952366439176467447947737680952277637330523818962104685553250402512989897886053

[E]ncrypt the flag.
[A]bort training.

> a

Goodbye
````

# Decryption 
Since `ct=70407336670535933819674104208890254240063781538460394662998902860952366439176467447947737680952277637330523818962104685553250402512989897886053` and `e=3` every time no matter what `N` is, we know that `m` must be small because it's not "wrapping around" no matter what the modulus is. 

Therefore we can simply find the cube root of `ct` since `ct = m^3 % N`.

````Python
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

# Flag
> HTB{5ma1l_E-xp0n3nt}

We find `m = 412926389432612660984016953290834154417829082237`. Then we transform the message to bytes and decode the message to get the flag:

````Python
m = long_to_bytes(m)
m = m.decode()

print(m)
````