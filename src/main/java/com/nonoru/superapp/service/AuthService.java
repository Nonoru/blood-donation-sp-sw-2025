package com.nonoru.superapp.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nonoru.superapp.dto.request.*;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.AuthResponse;
import com.nonoru.superapp.dto.response.IntrospectResponse;
import com.nonoru.superapp.entity.OtpPassword;
import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.OtpPasswordRepository;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.method.support.CompositeUriComponentsContributor;

import java.security.SecureRandom;
import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    @Autowired
    private UserService userService;
    @Autowired
    private CompositeUriComponentsContributor compositeUriComponentsContributor;
    @Autowired
    private MailService mailService;
    @Autowired
    private OtpPasswordRepository otpRepo;

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
                            .status(true)
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
        if(!user.isStatus()){
            throw new AppException(ErrorCode.ACCOUNT_BLACKLIST);
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
                .claim("id", userAccount.getId())
                .claim("role", userAccount.getRole().getRoleName().toUpperCase())
                .claim("fullName", userAccount.getFullName())
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

    @PostAuthorize("returnObject.username == authentication.name")
    public UserAccount getUserAccount(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
    }

    public void changePassword(ChangePasswordRequest request) {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idJwt = jwt.getClaim("id");
        if (userService.hasId(idJwt)){
            UserAccount user = userRepository.findById(idJwt).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
            boolean validOldPass = passwordEncoder.matches(request.getOldPassword(), user.getHashPassword());
            boolean validNewPass = request.getNewPassword().equals(request.getConfirmNewPassword());
            if(!validOldPass) {
                throw new AppException(ErrorCode.OLD_PASSWORD_INVALID);
            }else {
                if(!validNewPass) {
                    throw new AppException(ErrorCode.PASSWORD_CONFIRM_INCORRECT);
                }
                String newHashPassword = passwordEncoder.encode(request.getNewPassword());
                if(passwordEncoder.matches(request.getNewPassword(), newHashPassword)) {
                    user.setHashPassword(newHashPassword);
                    userRepository.save(user);
                }
            }
        }else{
            throw new AppException(ErrorCode.FUNCTION_NOT_ALLOW);
        }
    }

    public void createAndSendOtp(String email) {
        if(!userRepository.existsByEmail(email)) {
            throw new AppException(ErrorCode.EMAIL_NOT_FOUND);
        }
        String otp = String.format("%06d", new SecureRandom().nextInt(1_000_000));
        OtpPassword otpPassword = OtpPassword.builder()
                .email(email)
                .expiry(LocalDateTime.now().plus(5, ChronoUnit.MINUTES))
                .otpCode(otp)
                .build();
        otpRepo.save(otpPassword);
        mailService.sendOtpEmail(email, otp);
    }
    public AuthResponse checkOtp(ForgotPasswordEmailRequest request) {
        LocalDateTime now = LocalDateTime.now();
        OtpPassword otp = otpRepo.getOtpPassword(request.getEmail(), request.getOtp(), now);
        if(otp == null) {
            throw new AppException(ErrorCode.OTP_ERROR);
        }else{
            UserAccount user = userRepository.findByEmail(request.getEmail());
            String token = generateToken(user);
            return AuthResponse.builder()
                    .token(token)
                    .build();
        }
    }
    public void resetPassword(ResetPasswordRequest request)
            throws JOSEException, ParseException{
        String token = request.getToken();
        JWSVerifier verifier = new MACVerifier(signKey.getBytes());
        JWSObject  jwsObject = JWSObject.parse(token);
        String payload = jwsObject.getPayload().toString();
        String username = jwsObject.getPayload().toJSONObject().get("sub").toString();
        UserAccount user = userRepository.findByUsername(username);
        if(user == null) {
            throw new AppException(ErrorCode.USER_NOTFOUND);
        }
        if(!request.getNewPassword().equals(request.getConfirmNewPassword())) {
            throw new AppException(ErrorCode.PASSWORD_CONFIRM_INCORRECT);
        }
        String rawPassword = request.getNewPassword();

        String hashedPassword = passwordEncoder.encode(rawPassword);

        user.setHashPassword(hashedPassword);
        userRepository.save(user);

    }
    public IntrospectResponse introspect (IntrospectRequest request)
            throws JOSEException, ParseException {
        String token = request.getToken();
        JWSVerifier verifier = new MACVerifier(signKey.getBytes());
        JWSObject  jwsObject = JWSObject.parse(token);
        Date expTime = new Date((Long) jwsObject.getPayload().toJSONObject().get("exp"));

        boolean verified = jwsObject.verify(verifier);
        return IntrospectResponse.builder()
                .valid(verified && expTime.after(new Date()))
                .build();
    }
}
