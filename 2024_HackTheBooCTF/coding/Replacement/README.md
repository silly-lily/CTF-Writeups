### Replacement
Given a string, a letter in the string and a random letter, replace all instances of the first letter with the latter.

---

#### Replacing All Instances

First we read in the string, letter to be replaced, and random letter:

```python
# soln.py
string = input()
letter = input()
random_letter = input()
```

Next we replace all instances of `letter` with `random_letter`:

```python
# soln.py
answer = string.replace(letter,random_letter)
```

---

#### Flag
> HTB{g0tTa_r3pLacE_th3_sTR1nG!!_adc14fff9951a44d5b236db4bde32e94}

---