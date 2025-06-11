package com.nonoru.superapp.controller;

import com.nimbusds.jose.JOSEException;
import com.nonoru.superapp.dto.request.IntrospectRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.AuthResponse;
import com.nonoru.superapp.dto.response.IntrospectResponse;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import com.nonoru.superapp.dto.request.LoginAccountRequest;
import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.service.AuthService;
import jakarta.validation.Valid;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000/")
public class AuthAPI {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    ApiResponse<UserAccount> register (@RequestBody @Valid RegisterAccountRequest request){
        ApiResponse<UserAccount> apiResponse = new ApiResponse<>();
        authService.registerUserAccount(request);
        return apiResponse;
    }

    @PostMapping("/login")
    ApiResponse<AuthResponse> login (@RequestBody LoginAccountRequest request){
        AuthResponse res = authService.loginAccount(request);
        return ApiResponse.<AuthResponse>builder()
                .data(res)
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> login (@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        IntrospectResponse res = authService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .code(200)
                .data(res)
                .build();
    }
}
