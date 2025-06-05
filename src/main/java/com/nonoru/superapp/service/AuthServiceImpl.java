package com.nonoru.superapp.service;

import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.other.UserRegisterError;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.request.RegisterAccountRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service

public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

/* Block-Code Register Account */
// registerAccount() : main function to set value user account and save to table
    @Override
    public Map<String, String> registerAccount (RegisterAccountRequest request) {
        Map<String, String> errors = errorsFind(request);
        if(errors.isEmpty()) {
            String rawPassword = request.getPassword();
            String hashedPassword = bCryptPasswordEncoder.encode(rawPassword);
            RoleAccount role =
                    roleRepository.findById(request.getRoleId())
                            .orElseThrow(() -> new RuntimeException("Role not existed"));
            if (checkPassword(rawPassword, hashedPassword)) {
                UserAccount userAccount = new UserAccount(
                        request.getUsername(), hashedPassword, request.getEmail(), role);
                userRepository.save(userAccount);
            }
        }
        return errors;
    }

//  bCryptPasswordEncoder(): function change raw password to encrypt password
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

// checkPassword(): function to check rawpassword and encrypt password to ensure them match together
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return bCryptPasswordEncoder.matches(rawPassword, hashedPassword);
    }

// errorsFind(): function find errors by user input to support for registerAccount()
    public Map<String, String> errorsFind (RegisterAccountRequest request){
        UserRegisterError error = new UserRegisterError();
        Map<String, String> errors = new HashMap<>();
        if(userRepository.existsByUsername(request.getUsername())) {
            error.setExistUsername("Tên người dùng đã tồn tại");
            errors.put("existUsername", error.getExistUsername());
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            error.setExistEmail("Email đã tổn tại");
            errors.put("existEmail", error.getExistEmail());
        }
        if(!request.getPassword().equals(request.getPasswordConfirm())) {
            error.setErrorConfirmPassword("Nhập lại mật khẩu không chính xác");
            errors.put("errorConfirmPassword", error.getErrorConfirmPassword());
        }
        if(request.getUsername().length() < 6 || request.getUsername().length() >12) {
            error.setUsernameLengthInvalid("Độ dài username không phù hợp");
            errors.put("usernameLengthInvalid", error.getUsernameLengthInvalid());
        }
        if(request.getPassword().length() < 6 || request.getPassword().length() >12) {
            error.setPasswordLengthInvalid("Độ dài password không phù hợp");
            errors.put("passwordLengthInvalid", error.getPasswordLengthInvalid());
        }
        return errors;
    }

/* Block-Code Login Account */
}
