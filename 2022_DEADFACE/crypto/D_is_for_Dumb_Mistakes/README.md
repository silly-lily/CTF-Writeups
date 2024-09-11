# D is for Dumb Mistakes
D is for Dumb Mistakes is a crypto challenge focusing on RSA. To solve the challenge, we need to find the RSA decryption key for the corresponding RSA encryption key `e = 777887`. We are also given primes `p = 1049` and `q = 2063`. 

In our Python script `main.py`, we declare our variables `p`, `q`, and `e`. 

````Python
p = 1049
q = 2063

e = 777887
````

# Finding phi(n)
Next we use the Euler Totient Function to calculate `phi(n) = phi(p*q) = (p-1)*(q-1)`:

````Python
phi = (p-1)*(q-1)
````

# Finding d
We know that `d*e = 1 (mod phi(n))`. Since `phi(n)` is relatively small, we use can brute force to get `d = 1457215`:

````Python
for d in range(0,phi):

    if (d*e)%phi == 1:
        print(d)
        break
````

# Flag
> flag{d=1457215}