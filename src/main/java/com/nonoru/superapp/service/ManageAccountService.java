package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.dto.response.UserAccountManageResponse;
import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.ManageAccountRepository;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ManageAccountService {
    @Autowired
    private ManageAccountRepository manage;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }
    public List<UserAccountManageResponse> listAll(){
        List<UserAccount> list = manage.findAll();
        List<UserAccountManageResponse> responses = new ArrayList<>();
        list.forEach( x -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String date = x.getCreatedAt().format(formatter);
            responses.add(UserAccountManageResponse.builder()
                            .id(x.getId())
                            .username(x.getUsername())
                            .email(x.getEmail())
                            .fullName(x.getFullName())
                            .createAt(date)
                            .role(x.getRole())
                            .build());
        });
        return responses.stream()
                .sorted(Comparator
                    .comparing( (UserAccountManageResponse x) -> x.getRole().getRoleId() )
                    .thenComparing( UserAccountManageResponse::getUsername )
                )
                .collect(Collectors.toList());
    }

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
                roleRepository.findById(request.getRoleId()).orElseThrow(() -> new RuntimeException("Role not existed"));

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
}
