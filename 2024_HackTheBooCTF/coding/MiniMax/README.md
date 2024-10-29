# MiniMax
MiniMax is a coding challenge focusing on finding the biggest and smallest number in a list.

## Flag
> HTB{aLL_maX3d_0uT_56878a5cb76299e736db9f1168b8449f}

We read in a list of numbers `arr` which is a string where each number is separated by a space. We use the `split()` function to turn the `arr` string containing every number into an array of individual numbers:

```python
# soln.py
arr = input()
arr = arr.split()
```

`small` will hold the minimum and `big` will hold the maximum. We initialize `small` and `big` using the first number of the array. Next we loop through each number `n` in the array `arr`. If `n` is less than `small`, we update `small := n`. Likewise if `n` is larger than `big`, we update `big := n`:

```python
# soln.py
small = float(arr[0])
big = float(arr[0])

for n in arr:

    if float(n) < small:

        small = float(n)

    elif float(n) > big:

        big = float(n)

print(small)
print(big)
```