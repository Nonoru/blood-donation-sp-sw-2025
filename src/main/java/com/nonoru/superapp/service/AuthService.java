package com.nonoru.superapp.service;

import ch.qos.logback.core.spi.ErrorCodes;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.nonoru.superapp.dto.request.IntrospectRequest;
import com.nonoru.superapp.dto.response.AuthResponse;
import com.nonoru.superapp.dto.response.IntrospectResponse;
import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.dto.request.LoginAccountRequest;
import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
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

    @NonFinal
    @Value("${jwt.signerKey}")
    private String signKey;

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
            UserAccount user = UserAccount.builder()
                            .username(request.getUsername())
                            .hashPassword(hashedPassword)
                            .email(request.getEmail())
                            .role(role)
                            .fullName(request.getFullName())
                            .build();
            userRepository.save(user);
        }
    }


/* Block-Code Login Account */
    public AuthResponse loginAccount (LoginAccountRequest request) {
        UserAccount user = userRepository.findByUsername(request.getTk());
        if(user == null) {
            user = userRepository.findByEmail(request.getTk());
        }
        if(user == null) {
            throw new AppException(ErrorCode.LOGIN_FAIL);
        }
        boolean wrongPassword = !checkPassword(request.getPassword(), user.getHashPassword());

        if(wrongPassword) {
            throw new AppException(ErrorCode.LOGIN_FAIL);
        }
        String token = generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private String generateToken(UserAccount userAccount) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet claim = new JWTClaimsSet.Builder()
                .subject(userAccount.getUsername())
                .issuer("bloodbridge.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.DAYS).toEpochMilli()
                ))
                .build();
        Payload payload = new Payload(claim.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try{
            jwsObject.sign(new MACSigner(signKey.getBytes()));
            return jwsObject.serialize();
        }catch (JOSEException e) {
            throw new RuntimeException("Could not sign JWT object", e);
        }
    }
    public IntrospectResponse introspect (IntrospectRequest request)
            throws JOSEException, ParseException {
        String token = request.getToken();
        JWSVerifier verifier = new MACVerifier(signKey.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(verifier);
        return IntrospectResponse.builder()
                .valid(verified && expTime.after(new Date()))
                .build();
    }
    private String buildScope(UserAccount userAccount) {
        RoleAccount role = userAccount.getRole(); // lấy role
        if (role != null) {
            return role.getRoleName();
        }
        return "";
    }

}
