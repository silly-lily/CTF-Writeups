def nth_root(x,n): # n^1/x
 
    low, high = 0, x

    while low <= high:

        mid = (low + high) // 2
        cube = mid**n
        
        if cube == x:
            
            return mid

        elif cube < x:

            low = mid + 1

        else:
            
            high = mid - 1



def egcd(a, b): # ax+by = gcd(a,b) 

    if b == 0:
        return a, 1, 0

    gcd, x1, y1 = egcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1

    return gcd, x, y



def mod_inverse(a, m): # a^-1 (mod m)

    g, x, y = egcd(a, m)
    return x%m



def chinese_remainder_theorem(a, n):

    N = 1
    for ni in n:
        N *= ni
    
    result = 0
    for ai, ni in zip(a, n):
        Ni = N // ni
        mi = mod_inverse(Ni, ni)
        result += ai * Ni * mi
    
    return result % N