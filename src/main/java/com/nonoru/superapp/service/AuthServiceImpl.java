package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserRegisterRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public void register (UserRegisterRequest request) {
//        if(userRepository.existsByUsername(request.getUsername())) {
//            throw new RuntimeException("Username is already in use");
//        }
//        if(userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Email is already in use");
//        }

        UserAccount userAccount = new UserAccount(request.getUsername(), request.getPassword(), request.getEmail());
        userRepository.save(userAccount);
    }

}
