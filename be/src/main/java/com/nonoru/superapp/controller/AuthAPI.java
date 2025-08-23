package com.nonoru.superapp.controller;

import com.nimbusds.jose.JOSEException;
import com.nonoru.superapp.dto.request.*;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.AuthResponse;
import com.nonoru.superapp.dto.response.IntrospectResponse;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
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
    ApiResponse register (@RequestBody @Valid RegisterAccountRequest request){
        authService.registerUserAccount(request);
        return ApiResponse.builder()
                .message("Đăng ký thành công bạn hãy đăng nhập")
                .build();
    }

    @PostMapping("/login")
    ApiResponse<AuthResponse> login (@RequestBody LoginAccountRequest request){
        AuthResponse res = authService.loginAccount(request);
        return ApiResponse.<AuthResponse>builder()
                .data(res)
                .build();
    }

    @GetMapping("/user/{id}")
    ApiResponse<UserAccount> getUser (@PathVariable("id") Long id){
        return ApiResponse.<UserAccount>builder()
                .data(authService.getUserAccount(id))
                .build();
    }
    @PutMapping("/user/change/password")
    ApiResponse<Void> changePassword (@RequestBody @Valid ChangePasswordRequest request){
        authService.changePassword(request);
        return ApiResponse.<Void>builder()
                .message("Đổi mật khẩu thành công")
                .build();
    }

    @PostMapping("/user/forgot-password")
    ApiResponse<Void> sendEmailToGetOtp (@RequestBody @Valid ForgotPasswordEmailRequest request){
        authService.createAndSendOtp(request.getEmail());
        return ApiResponse.<Void>builder()
                .message("Đã gởi OPT đến gmail. Nhập OPT để thay đổi mật khẩu")
                .build();
    }
    @PostMapping("/user/check-otp")
    ApiResponse<AuthResponse> checkOtp (@RequestBody @Valid ForgotPasswordEmailRequest request){
        return ApiResponse.<AuthResponse>builder()
                .data(authService.checkOtp(request))
                .build();
    }
    @PostMapping("/user/reset-password")
    ApiResponse<Void> resetPassword (@RequestBody @Valid ResetPasswordRequest request)
    throws ParseException, JOSEException {
        authService.resetPassword(request);
        return ApiResponse.<Void>builder()
                .message("Đã tạo mới mật khẩu cho tài khoản")
                .build();
    }
}
