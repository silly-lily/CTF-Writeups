### Ancient Encodings
Your initialization sequence requires loading various programs to gain the necessary knowledge and skills for your journey. Your first task is to learn the ancient encodings used by the aliens in their communication.

Challenge Files: [output.txt](output.txt), [source.py](source.py)

---

#### Encoding

Looking at the challenge files, `source.py` encodes the flag. First it takes in the flag as a byte string, then it encodes the flag in Base64 and converts it into an integer. Lastly, the integer is stored in `output.txt` in hexadecimal format:

````Python
# source.py
FLAG = b"HTB{??????????}"


def encode(message):
    return hex(bytes_to_long(b64encode(message)))


def main():
    encoded_flag = encode(FLAG)
    with open("output.txt", "w") as f:
        f.write(encoded_flag)
````

---

#### Decoding
We reverse the encoding. Using the contents of `output.txt`, we convert the encoded flag into bytes. Next, we decode these bytes from Base64. Finally, we decode the resulting bytes into a string to retrieve the flag:

````Python
# soln.py
ct = '53465243657a467558336b7764584a66616a4231636d347a655639354d48566664326b786246397a5a544e66644767784e56396c626d4d775a4446755a334e665a58597a636e6c33614756794d33303d'

ct = bytes.fromhex(ct)
ct = b64decode(ct)
pt = ct.decode()
````

---

#### Flag
> HTB{1n_y0ur_j0urn3y_y0u_wi1l_se3_th15_enc0d1ngs_ev3rywher3}

---