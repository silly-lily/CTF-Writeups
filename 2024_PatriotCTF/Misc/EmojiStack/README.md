### Emoji Stack
Welcome to Emoji Stack, the brand new stack based emoji language! Instead of other stack based turing machines that use difficult to read and challenging characters like + - and [], Emoji Stack uses our proprietary patent pending emoji system. The details of our implentation is below

👉: Move the stack pointer one cell to the right
👈: Move the stack pointer one cell to the left
👍: Increment the current cell by one, bounded by 255
👎: Decrement the current cell by one, bounded by 0
💬: Print the ASCII value of the current cell
🔁##: Repeat the previous instruction 0x## times
The Emoji Stack is 256 cells long, with each cell supporting a value between 0 - 255.

As an example, the program "👍🔁47💬👉👍🔁68💬👉👍🔁20💬" Would output "Hi!" with the following execution flow:

[0, 0, 0, 0]
👍🔁47
[0x48, 0, 0, 0]
💬👉: H
[0x48, 0, 0, 0]
👍🔁68
[0x48, 0x69, 0, 0]
💬👉: i
[0x48, 0x69, 0, 0]
👍🔁20
[0x48, 0x69, 0x21, 0]
💬: !


Challenge Files: [input.txt](input.txt)

---

#### Stack Initialization

We create a stack array `cells` that is 256 cells long. Each cell in the stack will hold an integer between `0-255`. We initialize each cell to have value `0`.

Additionally we create a stack pointer `j` which we initialize as pointing to the first cell.

```python
# soln.py
j=0
stack = [0]*256
```

#### Language Parsing
We use a for loop to parse our string of emojis `stack` into individual commands. The repeat command `🔁##` is 3 characters with the 2nd and third characters being two hexadecimal digit that represent the number times to repeat the previous command. We convert these two hexadecimal digit into an integer `rep_num`. Then we use nested for loop to execute that previous command `rep_num` amount of times. Lastly we increment `i+=2` to skip over the remainder of the repeat command and to start parsing the next command.

Each of the other commands `👉`, `👈`, `👍`, `👎`, `💬` are all 1 emoji long and are only executed once.


```python
# soln.py
for i in range(0,len(stack)):

    if stack[i] == '🔁':

        prev = stack[i-1]
        rep_num = int(stack[i+1:i+3],16)

        for k in range(0,rep_num):

            map_emoji(prev)
            
        i+=2

    else:

        map_emoji(stack[i])

```

#### Emoji Mapping
Next we map the emojis to their functions. The '👉' emoji increases our stack pointer `j` by 1 and the '👈' emoji decreases `j` by 1. The '👍' emoji increases the value of the cell that the stack pointer `j` is pointing to by 1 and the '👎' emoji decreases the value of the cell by 1. Additionally after changing the value of the cell, we do a bounds check. The '💬' emoji prints the current cell value.

```Python
# soln.py
def map_emoji(emoji):

    global j, cells, out

    if emoji == '👉':

        j+=1

    elif emoji == '👈':

        j-=1

    elif emoji == '👍':

        cells[j]+=1

        if cells[j] > 255:

            cells[j] = 255

    elif emoji == '👎':

        cells[j]-=1

        if cells[j] < 0:

            cells[j] = 0

    elif emoji == '💬':

        out+=chr(cells[j])
```

---

#### Flag
> CACI{TUR!NG_!5_R011!NG_!N_H!5_GR@V3}

---