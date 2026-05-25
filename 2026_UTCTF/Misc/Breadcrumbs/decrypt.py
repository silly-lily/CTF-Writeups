def caesar_decode(s, shift):
    result = ""
    for c in s:
        if 'a' <= c <= 'z':
            result += chr((ord(c)-ord('a') - shift) % 26 + ord('a'))
        elif 'A' <= c <= 'Z':
            result += chr((ord(c)-ord('A') - shift) % 26 + ord('A'))
        else:
            result += c
    return result

encoded = "hgsynt{s0yy0j1at_gu3_pe4jy_ge41y}"

# Try shift values until the prefix becomes utflag
for shift in range(26):
    decoded = caesar_decode(encoded, shift)
    if decoded.startswith("utflag"):
        print("Shift =", shift, "->", decoded)
        break
