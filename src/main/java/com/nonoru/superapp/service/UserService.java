package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserTokenDTO;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public UserTokenDTO getUserDetail(String username) {
        UserAccount userAccount = userRepository.findByUsername(username);
        return UserTokenDTO.builder()
                .username(userAccount.getUsername())
                .role(userAccount.getRole().getRoleName())
                .build();
    }
}
