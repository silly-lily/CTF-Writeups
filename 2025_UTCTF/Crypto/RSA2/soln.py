from util import nth_root, mod_inverse, chinese_remainder_theorem

fp = open('rsa.txt','r')
lines = fp.readlines()
n = int(lines[0][3:])
e = int(lines[1][3:])
c = int(lines[2][3:])

p = nth_root(n,2)
phi = p*(p-1)

d1 = mod_inverse(e,p)
d2 = mod_inverse(e,p-1)
d = chinese_remainder_theorem([d1,d2],[p,p-1])

m = pow(c,d,n)
m = m.to_bytes((m.bit_length() + 7) // 8, byteorder='big').decode('utf-8')
print(m)