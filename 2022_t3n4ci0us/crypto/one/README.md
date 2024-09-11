# One
One is a crypto challenge. The challenge asks us to find the solution to:

````
26s + 8t = 2( == gcd(26,8))
    + 12345 for the correct answer
````

# Flag
> T3N4CI0UA{123457}

Using the extended euclidean algorithm, we notice that `gcd(26,2) = 2`. So since this was the correct answer to `2( == gcd(26,8))`, we add `2+12345 = 12347` to get the flag `T3N4CI0UA{123457}`.