package com.nonoru.superapp.config;

import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {
    @Value("${jwt.signerKey}")
    private String signerKey;
    public boolean introspectToken(String token) {
        try{
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(signerKey.getBytes());
            boolean verified = signedJWT.verify(verifier);
            Date expirationDate = signedJWT.getJWTClaimsSet().getExpirationTime();
            return verified && (expirationDate.after(new Date()));
        }catch (Exception e){
            return false;
        }
    }
    public String getUsernameFromToken(String token) {
        try{
            SignedJWT signedJWT = SignedJWT.parse(token);
            String username = signedJWT.getJWTClaimsSet().getSubject();
            return username;
        }catch (Exception e){
            return null;
        }
    }
}
