package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.UserAccountManageResponse;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.service.ManageAccountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000/")
public class AdminAPI {
    @Autowired
    private ManageAccountService service;

    @PostMapping("/get-all")
    ApiResponse<List<UserAccountManageResponse>> getall(){
        return ApiResponse.<List<UserAccountManageResponse>>builder()
                .data(service.listAll())
                .build();
    }
    @PostMapping("/create-account")
    ApiResponse register (@RequestBody @Valid RegisterAccountRequest request){
        service.registerUserAccount(request);
        return ApiResponse.builder()
                .message("Đăng ký thành công bạn hãy đăng nhập")
                .build();
    }
}
