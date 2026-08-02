fp = open('aha.txt')
cts = fp.read().split()


pts = ''

for ct in cts:

    pt = ct.replace('A','0')
    pt = pt.replace('H','1')
    pts+=chr(int(pt,2))

print(pts)