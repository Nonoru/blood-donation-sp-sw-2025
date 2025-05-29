package com.nonoru.superapp.controller;

import com.nonoru.superapp.entity.UserRegisterError;
import com.nonoru.superapp.repository.UserRepository;
import com.nonoru.superapp.request.UserRegisterRequest;
import com.nonoru.superapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody UserRegisterRequest request){
        UserRegisterError error = authService.registerAccount(request);
        System.out.println(request.toString());
        System.out.println(error.toString());
        if(error.getErrorConfirmPassword() != null) {
            return new ResponseEntity<>(error.getErrorConfirmPassword(), HttpStatus.BAD_REQUEST);
        }else if(error.getExistEmail() != null) {
            return new ResponseEntity<>(error.getExistEmail(), HttpStatus.BAD_REQUEST);
        }else if(error.getExistUsername() != null) {
            return new ResponseEntity<>(error.getExistUsername(), HttpStatus.BAD_REQUEST);
        }else {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }
    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam("username") String username) {
        boolean exists = userRepository.existsByUsername(username);
        return ResponseEntity.ok(exists);
    }

}
