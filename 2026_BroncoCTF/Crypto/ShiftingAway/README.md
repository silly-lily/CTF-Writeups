### Shifting Away
I'm slowly shifting, shifting afar Char after char, char after char I'm slowly shifting (shifting afar)

And it feels like I'm fighting Underscores against the stream Braces against the stream

(Source Material: Mr. Probz, 2013)

`bqmkyj{Ldfmam_Nfd_Abxjpb_Thhdqeia_Snqn_Vzey_Bok_TdudakQkwfy_Kkhxbte_Yo_Jnfvdeueqq}`

---

#### Flag
> bronco{Slowly_But_Surely_Shifting_Away_Into_The_PascalSnake_Strings_Of_Characters}

The flag can be recovered by shifting each letter by its index. If the shifted index is greater than 26, it wraps around. If a letter is lowercase, the shifted letter is lowercase. Additionally if the letter is uppercase, the shifted letter is also uppercase. If a character isn't a letter than it's kep the same:

```python
# soln.py
ct = 'bqmkyj{Ldfmam_Nfd_Abxjpb_Thhdqeia_Snqn_Vzey_Bok_TdudakQkwfy_Kkhxbte_Yo_Jnfvdeueqq}'

offset = 0

pt = ''

for i in range(0,len(ct)):

    if ct[i].isalpha():

        shifted = chr((ord(ct[i].upper()) - ord('A') + offset) % 26 + ord('A'))
        shifted = shifted.lower() if ct[i].islower() else shifted
       
        pt+=shifted
        offset+=1

    else:
        pt+=ct[i]
        offset+=1

print(pt)
```

---