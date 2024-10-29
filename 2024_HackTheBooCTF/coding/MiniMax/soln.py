arr = input()
arr = arr.split()

small = float(arr[0])
big = float(arr[0])

for n in arr:

    if float(n) < small:

        small = float(n)

    elif float(n) > big:

        big = float(n)

print(small)
print(big)