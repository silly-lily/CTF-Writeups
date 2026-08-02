ct = 'bqmkyj{Ldfmam_Nfd_Abxjpb_Thhdqeia_Snqn_Vzey_Bok_TdudakQkwfy_Kkhxbte_Yo_Jnfvdeueqq}'

offset = 0

pt = ''

for i in range(0,len(ct)):

    if ct[i].isalpha():

        shifted = chr((ord(ct[i].upper()) - ord('A') + offset) % 26 + ord('A'))
        shifted = shifted.lower() if ct[i].islower() else shifted
       
        pt+=shifted
        offset+=1

    else:
        pt+=ct[i]
        offset+=1

print(pt)