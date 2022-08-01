import requests
import json
import itertools
import time
import re

book = {}

book['1'] = '''TWAS THE NIGHT BEFORE CHRISTMAS, WHEN ALL THROUGH THE HOUSE
NOT A CREATURE WAS STIRRING, NOT EVEN A MOUSE;
THE STOCKINGS WERE HUNG BY THE CHIMNEY WITH CARE,
IN HOPES THAT ST. NICHOLAS SOON WOULD BE THERE;'''

book['2'] = '''THE CHILDREN WERE
NESTLED ALL SNUG IN THEIR BEDS;
WHILE VISIONS OF
SUGAR-PLUMS DANCED IN THEIR HEADS;
AND MAMMA IN HER 'KERCHIEF, AND I IN MY CAP,
HAD JUST SETTLED OUR BRAINS FOR A LONG WINTER'S NAP,'''

book['3'] = '''WHEN OUT ON THE LAWN THERE AROSE SUCH A CLATTER,
I SPRANG FROM MY BED TO SEE WHAT WAS THE
MATTER.
AWAY TO THE WINDOW I FLEW LIKE A FLASH,
TORE OPEN THE SHUTTERS AND THREW UP THE SASH.'''

book['4'] = '''THE MOON ON THE BREAST OF THE NEW-FALLEN SNOW,
GAVE A LUSTRE OF MIDDAY TO OBJECTS BELOW,
WHEN WHAT TO MY
WONDERING EYES DID
APPEAR,
BUT A MINIATURE SLEIGH
AND EIGHT TINY REIN-DEER,'''
    
book['5'] = '''WITH A LITTLE OLD DRIVER SO LIVELY AND QUICK,
I KNEW IN A MOMENT HE MUST BE ST. NICK.
MORE RAPID THAN EAGLES HIS COURSERS THEY CAME,
AND HE WHISTLED, AND SHOUTED, AND CALLED THEM BY NAME:'''

book['6'] = '''"NOW, DASHER! NOW, DANCER! NOW PRANCER AND VIXEN!
ON, COMET! ON, CUPID! ON, DONDER AND BLITZEN!
TO THE TOP OF THE PORCH! TO THE TOP OF THE WALL!
NOW DASH AWAY! DASH
AWAY! DASH AWAY ALL!"'''

book['7'] = '''AS LEAVES THAT BEFORE THE WILD HURRICANE FLY,
WHEN THEY MEET WITH AN OBSTACLE, MOUNT TO THE SKY;
SO UP TO THE HOUSETOP THE COURSERS THEY FLEW
WITH THE SLEIGH FULL OF TOYS, AND ST. NICHOLAS TOO'''

book['8'] = '''AND THEN, IN A TWINKLING, I HEARD ON THE ROOF
THE PRANCING AND PAWING OF EACH LITTLE HOOF.
AS I DREW IN MY HEAD, AND WAS TURNING AROUND,
DOWN THE CHIMNEY ST. NICHOLAS CAME WITH A BOUND.'''

book['9'] = '''HE WAS DRESSED ALL IN FUR, FROM HIS HEAD TO HIS FOOT,
AND HIS CLOTHES WERE ALL TARNISHED WITH ASHES AND SOOT;
A BUNDLE OF TOYS HE HAD FLUNG ON HIS BACK,
AND HE LOOKED LIKE A PEDLER JUST OPENING HIS PACK.'''

book['10'] = '''HIS EYES HOW THEY TWINKLED! HIS DIMPLES, HOW MERRY!
HIS CHEEKS WERE LIKE ROSES, HIS NOSE LIKE A CHERRY!
HIS DROLL LITTLE MOUTH WAS DRAWN UP LIKE A BOW,
AND THE BEARD ON HIS
CHIN WAS AS WHITE AS THE SNOW.'''

book['11'] = '''THE STUMP OF A PIPE HE HELD TIGHT IN HIS TEETH,
AND THE SMOKE, IT ENCIRCLED HIS HEAD LIKE A WREATH;
HE HAD A BROAD FACE AND A LITTLE ROUND BELLY
THAT SHOOK WHEN HE LAUGHED, LIKE A BOWL FULL OF JELLY.'''

book['12'] = '''HE WAS CHUBBY AND PLUMP, A RIGHT JOLLY OLD ELF,
AND I LAUGHED WHEN I SAW HIM, IN SPITE OF MYSELF;
A WINK OF HIS EYE AND A TWIST OF HIS HEAD
SOON GAVE ME TO KNOW H HAD NOTHING TO DREAD;'''

book['13'] = '''HE SPOKE NOT A WORD,
BUT WENT STRAIGHT TO HIS WORK,
AND FILLED ALL THE
STOCKINGS; THEN TURNED WITH A JERK,
AND LAYING HIS FINGER ASIDE OF HIS NOSE,
AND GIVING A NOD, UP THE CHIMNEY HE ROSE;'''

book['14'] = '''HE SPRANG TO HIS SLEIGH,
TO HIS TEAM GAVE A WHISTLE,
AND AWAY THEY ALL FLEW
LIKE THE DOWN OF A THISTLE.
BUT I HEARD HIM EXCLAIM, ERE HE DROVE OUT OF SIGHT-
"HAPPY CHRISTMAS TO ALL, AND TO ALL A GOOD NIGHT!"'''

phone_mapping = {
    '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL',
    '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ'
}

def solve_silver():

    pts = ''
    pin = ''
    cts = [('2','6','1'),('4','19','3'),('6','1','1'),('3','10','4'),('14','8','3')] # ('page','word','character')

    for ct in cts:

        p,w,c = ct

        page = book[p]
        page = page.split()

        word = page[int(w)-1]
        word = re.sub(r'[^\w\s]', '',word)
        
        character = word[int(c)-1]
        pts+=character

    for pt in pts:
        for number, letters in phone_mapping.items():
            if pt in letters:
                pin+=number

    return pts, pin

def solve_gold():
    
    url = "https://hhc24-frostykeypad.holidayhackchallenge.com/submit?id=820bf1ed-a7a2-447d-9ca2-7610f3d402ec"
    cookies = {"CreativeCookieName":"{INSERT YOUR COOKIE HERE}"}
    data = {"answer": -1}

    buttons = ['2', '6', '7', '8'] # Define The Possible Buttons
    digits = [0,1,2,3,4] # Define The Possible Digits in Passcode

    for rep_button in buttons: # Chooses Button to Repeat

        attempt = [None,None,None,None,None]

        nonrep_buttons = [i for i in buttons if i != rep_button] 

        all_rep_digits = list(itertools.combinations(digits, 2))

        for rep_digit in all_rep_digits: # Chooses Digits in Passcode With Repeating Button

            rep_digit1,rep_digit2 = rep_digit
            attempt[rep_digit1] = rep_button
            attempt[rep_digit2] = rep_button

            nonrep_digits = [i for i in digits if i != rep_digit1 and i != rep_digit2]     
            all_perm = list(itertools.permutations(nonrep_buttons))
            
            for perm in all_perm:

                button1, button2, button3 = perm # Order of the Non-Repeating Buttons
                attempt[nonrep_digits[0]] = button1
                attempt[nonrep_digits[1]] = button2
                attempt[nonrep_digits[2]] = button3

                pin = ''.join(attempt)
                data["answer"] = pin

                # Send the POST request
                response = requests.post(url, json=data)
                time.sleep(1)

                if response.status_code == 200: # Success code
                    return pin
