### MiniMax
Given a string of numbers, find the smallest and largest and print them out.

---

#### Finding the Smallest and Largest

We read in a string where each number is separated by a space and convert the string into an array of individual numbers:

```python
# soln.py
arr = input()
arr = arr.split()
```

Then we look through each number in the list. Using the variables `small` and `big` to track the minimum and maximum so far, we update `small` or `big` based on the new number:

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

---

#### Flag
> HTB{aLL_maX3d_0uT_56878a5cb76299e736db9f1168b8449f}

---