package com.nonoru.superapp.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nonoru.superapp.dto.response.AuthResponse;
import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.dto.request.LoginAccountRequest;
import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service

public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    private final String SIGN_KEY = "wEDCBaS00Qr970TDN7svt2/B+ld6qx+f/UwOPdGbSRt3pTogLD4aX902srj8/J6V";

/* Block-Code Register Account */
    public void registerUserAccount(RegisterAccountRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        if(!request.getPassword().equals(request.getPasswordConfirm())) {
            throw new AppException(ErrorCode.PASSWORD_CONFIRM_INCORRECT);
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        String rawPassword = request.getPassword();

        String hashedPassword = passwordEncoder.encode(rawPassword);

        RoleAccount role =
                roleRepository.findById(3).orElseThrow(() -> new RuntimeException("Role not existed"));

        if (checkPassword(rawPassword, hashedPassword)) {
            UserAccount userAccount = new UserAccount(request.getFullName(),request.getUsername(), hashedPassword, request.getEmail(), role);

            userRepository.save(userAccount);
        }
    }


/* Block-Code Login Account */
    public AuthResponse loginAccount (LoginAccountRequest request) {
        boolean result = true;
        UserAccount user = userRepository.findByUsername(request.getUsername());
        if(!checkPassword(request.getPassword(), user.getHashPassword())){
            result = false;
        }
        if(!result) {
            throw new RuntimeException("Invalid username or password");
        }
        String token = generateToken(user);
        AuthResponse authResponse = new AuthResponse(token, true);
        return authResponse;
    }

    private String generateToken(UserAccount userAccount) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.ES512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(userAccount.getUsername())
                .issuer("bloodbridge.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(SIGN_KEY.getBytes()));
            return jwsObject.serialize();
        }catch (JOSEException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    private String buildScope(UserAccount userAccount) {
        RoleAccount role = userAccount.getRole(); // lấy role
        if (role != null) {
            return role.getRoleName();
        }
        return "";
    }

}
