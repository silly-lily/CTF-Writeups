from util import nth_root

fp = open('rsa.txt','r')
lines = fp.readlines()
n = int(lines[0][3:])
e = int(lines[1][3:])
c = int(lines[2][3:])



m = nth_root(c,3)
m = m.to_bytes((m.bit_length() + 7) // 8, byteorder='big').decode('utf-8')
print(m)