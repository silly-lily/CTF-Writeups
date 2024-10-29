# Replacement
Replacement is a programming challenge focusing on replacing all letters in a string with a random letter.

## Flag
> HTB{g0tTa_r3pLacE_th3_sTR1nG!!_adc14fff9951a44d5b236db4bde32e94}

First we read the `string` string, the letter to be replaced `letter`, and the random letter `random_letter`:

```python
# soln.py
string = input()
letter = input()
random_letter = input()
```

Next we replace all instances of `letter` with `random_letter` using the string `replace()` function:

```python
# soln.py
answer = string.replace(letter,random_letter)
```

Lastly print the flag:
```python
# soln.py
print(answer)
```