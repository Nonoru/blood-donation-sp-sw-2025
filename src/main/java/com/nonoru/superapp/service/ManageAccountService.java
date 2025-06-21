package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.dto.request.UpdateAccountRequest;
import com.nonoru.superapp.dto.response.UserAccountManageResponse;
import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ManageAccountService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserAccountManageResponse> listAll(){
        List<UserAccount> list = userRepository.findAll();
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
                            .status(x.isStatus())
                            .build());
        });
        return responses.stream()
                .sorted(Comparator
                    .comparing( (UserAccountManageResponse x) -> x.getRole().getRoleId() )
                    .thenComparing( UserAccountManageResponse::getUsername )
                )
                .collect(Collectors.toList());
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public void create(RegisterAccountRequest request) {
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

        RoleAccount role = roleRepository.findById(request.getRoleId()).orElseThrow(()
            -> new AppException(ErrorCode.ROLE_ID_NOTFOUND));

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

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public int update(Long id,UpdateAccountRequest request) {
        UserAccount user = userRepository.findById
                (id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        if(
            userRepository.existsByEmail(request.getEmail()) &&
                    !request.getEmail().equals(user.getEmail())
        ) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        RoleAccount role =
                roleRepository.findById(request.getRoleId()).orElseThrow(() -> new RuntimeException("Role not existed"));

        int countChange = 0;

        if(!user.getEmail().equals(request.getEmail())) {
            user.setEmail(request.getEmail());
            countChange+=1;
        }
        if(!user.getFullName().equals(request.getFullName())) {
            user.setFullName(request.getFullName());
            countChange+=1;
        }
        if(user.getRole().getRoleId() != request.getRoleId()) {
            user.setRole(role);
            countChange+=1;
        }
        roleRepository.save(role);
        return countChange;
    }

    public void deleteStillExist(Long id) {
        UserAccount user = userRepository.findById
                (id).orElseThrow(() -> new AppException(ErrorCode.USER_NOTFOUND));
        user.setStatus(false);
        userRepository.save(user);
    }
}
