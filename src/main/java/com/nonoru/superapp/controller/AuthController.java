package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.UserRegisterRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register (@RequestBody UserRegisterRequest request){
        System.out.println(request.toString());
        authService.register(request);
        return "success";
    }
}
