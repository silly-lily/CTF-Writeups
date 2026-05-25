x_1 = 4176616824
x_2 = 2681459949
x_3 = 1541137174
x_4 = 3272915523

m  = pow(2,32)

d_2 = (x_3-x_2)%m
d_1 = (x_2-x_1)%m

a = (d_2*pow(d_1,-1,m))%m
c = (x_2-a*x_1)%m

x_5 = (a*x_4+c)%m


ct = '3cff226828ec3f743bb820352aff1b7021b81b623cff31767ad428672ef6'
ct = bytes.fromhex(ct)

key = x_5.to_bytes(4, "big")
key = key*((len(ct) + 3) // 4)

pt = bytes([c ^ k for c, k in zip(ct, key)])
pt = pt.decode()

print(pt)