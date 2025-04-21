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