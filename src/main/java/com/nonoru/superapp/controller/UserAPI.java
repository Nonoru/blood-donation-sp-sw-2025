package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.OrderDateDonationResponse;
import com.nonoru.superapp.entity.OrderDateDonation;
import com.nonoru.superapp.service.OrderBloodDonationService;
import com.nonoru.superapp.service.OrderDateDonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserAPI {
    @Autowired
    private OrderBloodDonationService bloodDonationService;
    @Autowired
    private OrderDateDonationService dateDonationService;
    @PostMapping("/order-donation")
    public ApiResponse<Void> createOrder
            (@Valid @RequestBody OrderBloodDonationRequest request) {
        System.out.println(request.toString());
        bloodDonationService.createOrderBloodDonation(request);
        return ApiResponse.<Void>builder()
                .message("Tạo đơn hoàn tất! Vui lòng chờ để được xét duyệt")
                .build();
    }
    @GetMapping("/get-order-date")
    public ApiResponse<List<OrderDateDonationResponse>> getOrderDate(){
        return ApiResponse.<List<OrderDateDonationResponse>>builder()
                .data(dateDonationService.getOrderDateDonation())
                .build();
    }
}
