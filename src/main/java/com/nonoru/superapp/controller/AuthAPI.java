package com.nonoru.superapp.controller;

import com.nonoru.superapp.repository.UserRepository;
import com.nonoru.superapp.request.RegisterAccountRequest;
import com.nonoru.superapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthAPI {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegisterAccountRequest request){
        System.out.println(request.toString());
        Map<String, String> errors = authService.registerAccount(request);
        if(errors.isEmpty()){
            return ResponseEntity.ok(true);
        }else{
            return ResponseEntity.badRequest().body(errors);
        }
    }
}
