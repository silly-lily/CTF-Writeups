# Mayday
Mayday is a crypto challenge focusing on the NATO phonetic alphabet. The ciphertext seems to be a random string of words: `Whiskey Hotel Four Tango Dash Alpha Romeo Three Dash Yankee Oscar Uniform Dash Sierra One November Kilo India November Golf Dash Four Bravo Zero Uniform Seven`.

# NATO phonetic alphabet
Googling the string, the [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet) comes up. All the words in the ciphertext are contained in the NATO phonetic alphabet's code words.

# Decryption
Now all we must do is decrypt the words back to their corresponding letters. Doing this using python can save you time.
```Python
ct = 'Whiskey Hotel Four Tango Dash Alpha Romeo Three Dash Yankee Oscar Uniform Dash Sierra One November Kilo India November Golf Dash Four Bravo Zero Uniform Seven'
ct = ct.split(' ')

nato_phonetic_alphabet = {
    'A': 'Alpha',
    'B': 'Bravo',
    'C': 'Charlie',
    'D': 'Delta',
    'E': 'Echo',
    'F': 'Foxtrot',
    'G': 'Golf',
    'H': 'Hotel',
    'I': 'India',
    'J': 'Juliett',
    'K': 'Kilo',
    'L': 'Lima',
    'M': 'Mike',
    'N': 'November',
    'O': 'Oscar',
    'P': 'Papa',
    'Q': 'Quebec',
    'R': 'Romeo',
    'S': 'Sierra',
    'T': 'Tango',
    'U': 'Uniform',
    'V': 'Victor',
    'W': 'Whiskey',
    'X': 'X-ray',
    'Y': 'Yankee',
    'Z': 'Zulu',
    '0': 'Zero',
    '1': 'One',
    '2': 'Two',
    '3': 'Three',
    '4': 'Four',
    '5': 'Five',
    '6': 'Six',
    '7': 'Seven',
    '8': 'Eight',
    '9': 'Nine',
    '-': 'Dash'
}

pt = ''
for word in ct:
    pt+=list(filter(lambda x: nato_phonetic_alphabet[x] == word, nato_phonetic_alphabet))[0]
```

# Flag
> TFCCTF{WH4T-AR3-YOU-S1NKING-4B0U7}

Lastly we print the `pt` to get the flag:

```Python
print(pt)
```