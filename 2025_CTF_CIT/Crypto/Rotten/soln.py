ct = 'PVG{LxxdJwAXJGcsDoncKfRctddA}'
flag = ''

key = ord(ct[0])-ord('C')



for c in ct:

    if c.isalpha():

        ascii_val = ord(c.upper())
        c_val = ascii_val-ord('A')
        
        new_c_val = (c_val-key)%26
        new_ascii_val = (c_val-key)%26+ord('A')
        
        new_c = chr(new_ascii_val)
        flag = flag+(new_c if c.isupper() else new_c.lower())

    else:

        flag+=c

print(flag)