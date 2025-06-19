package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserDetail;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public UserDetail getUserDetail(String username) {
        UserAccount userAccount = userRepository.findByUsername(username);
        return UserDetail.builder()
                .username(userAccount.getUsername())
                .role(userAccount.getRole().getRoleName())
                .build();
    }
}
