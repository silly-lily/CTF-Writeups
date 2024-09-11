p = 1049
q = 2063

phi = (p-1)*(q-1)

e = 777887

for d in range(0,phi):

    if (d*e)%phi == 1:
        print(d)
        break

