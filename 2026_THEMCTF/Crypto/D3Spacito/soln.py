from Crypto.Cipher import DES
import base64



def unpad(plaintext):

    return plaintext.rstrip("*")

def dec(ciphertext, key):

    cipher = DES.new(key, DES.MODE_ECB)
    return cipher.decrypt(base64.b64decode(ciphertext))

ciphertext = "T/tGpZNyHdhnf1oxwRmMPFcLiH//AfZdTpmYdp8daU0="
key = bytes.fromhex("E1E1E1E1F0F0F0F0")

print(unpad(dec(ciphertext=ciphertext,key=key).decode()))