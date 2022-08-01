import javax.crypto.Cipher;

import javax.crypto.spec.GCMParameterSpec;

import javax.crypto.spec.SecretKeySpec;

import java.util.Base64;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;

 

class Main {

   

    public static void main(String[] args) {

       

        String string = "rmDJ1wJ7ZtKy3lkLs6X9bZ2Jvpt6jL6YWiDsXtgjkXw=";
        String string2 = "Q2hlY2tNYXRlcml4";
        
        String obj = string.trim();
        String obj2 = string2.trim();
        
        byte[] decode = Base64.getDecoder().decode(obj);
        byte[] decode2 = Base64.getDecoder().decode(obj2);
        
        byte[] this_encryptionKey = decode;
        byte[] this_iv = decode2;
        SecretKey this_secretKeySpec = new SecretKeySpec(decode, "AES");
       

        String encrypted = "Base64 Encrypted String";
        
        try {
            
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, this_secretKeySpec, new GCMParameterSpec(128, this_iv));
        
        byte[] doFinal = cipher.doFinal(Base64.getDecoder().decode(encryped));
     
            String decrypted = new String(doFinal, StandardCharsets.UTF_8);

        System.out.println(decrypted);

        } catch(Exception e) {

            System.out.println(e.toString());

        }

       

    }

}