package com.nonoru.superapp.controller;

import com.nonoru.superapp.entity.UserRegisterError;
import com.nonoru.superapp.repository.UserRepository;
import com.nonoru.superapp.request.UserRegisterRequest;
import com.nonoru.superapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

        Map<String, String> errors = new HashMap<>();
        if(error.getErrorConfirmPassword() != null)
            errors.put("errorConfirmPassword", error.getErrorConfirmPassword());
        if(error.getExistEmail() != null)
            errors.put("existEmail", error.getExistEmail());
        if(error.getExistUsername() != null)
            errors.put("existUsername", error.getExistUsername());
        if(errors.isEmpty()){
            return ResponseEntity.ok(true);
        }else{
            return ResponseEntity.badRequest().body(errors);
        }
    }
//    @GetMapping("/check-username")
//    public ResponseEntity<Boolean> checkUsername(@RequestParam("username") String username) {
//        boolean exists = userRepository.existsByUsername(username);
//        return ResponseEntity.ok(exists);
//    }

}
