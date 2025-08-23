package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.RegisterAccountRequest;
import com.nonoru.superapp.dto.request.UpdateAccountRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.OrderBloodDonationResponse;
import com.nonoru.superapp.dto.response.UserAccountManageResponse;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.service.ManageAccountService;
import com.nonoru.superapp.service.OrderBloodDonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000/")
public class AdminAPI {
    @Autowired
    private ManageAccountService service;

    @GetMapping("/list")
    ApiResponse<List<UserAccountManageResponse>> getAll(){
        return ApiResponse.<List<UserAccountManageResponse>>builder()
                .data(service.listAll())
                .build();
    }
    @PostMapping("/create")
    ApiResponse<Void> create (@RequestBody @Valid RegisterAccountRequest request){
        service.create(request);
        return ApiResponse.<Void>builder()
                .message("Đăng ký thành công bạn hãy đăng nhập")
                .build();
    }
    @PutMapping("/update/{id}")
    ApiResponse<Map<String, Integer>> update (@PathVariable("id") long id, @RequestBody @Valid UpdateAccountRequest request){
        System.out.println(request.toString());
        int count = service.update(id,request);
        String msg = "Hoàn tất ! Có "+ count +" thay đổi";
        return ApiResponse.<Map<String, Integer> >builder()
                .message(msg)
                .build();
    }

    @DeleteMapping("/delete/{id}")
    ApiResponse<Void> delete (@PathVariable("id") long id){
        service.deleteStillExist(id);
        return ApiResponse.<Void> builder()
                .message("Đã xóa thông tin account có id " + id)
                .build();
    }



}
