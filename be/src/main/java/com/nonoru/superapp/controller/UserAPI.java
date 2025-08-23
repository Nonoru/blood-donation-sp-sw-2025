package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.request.OrderBloodReceiveRequest;
import com.nonoru.superapp.dto.response.*;
import com.nonoru.superapp.entity.BloodType;
import com.nonoru.superapp.service.*;
//import com.nonoru.superapp.service.OrderBloodReceiveService;
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
    @Autowired
    private UserService userService;
    @Autowired
    private BloodService bloodService;
    @Autowired
    private OrderBloodReceiveService bloodReceiveService;
    @Autowired
    private BloodBagService bloodBagService;


    @PostMapping("/order-donation")
    public ApiResponse<Void> createOrder
            (@Valid @RequestBody OrderBloodDonationRequest request) {
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
    @GetMapping("/list-order")
    public ApiResponse<List<UserOrderDonationResponse>> getListOrder(){
        return ApiResponse.<List<UserOrderDonationResponse>>builder()
                .data(userService.getOrderDonationOnlySelf())
                .build();
    }

    @GetMapping("/list-bloods")
    public ApiResponse<List<BloodType>> getBloodTypes(){
        return ApiResponse.<List<BloodType>>builder()
                .data(bloodService.getAllBloodTypes())
                .build();
    }
    @PostMapping("/order-receiving")
    public ApiResponse<Void> createOrderReceiving
            (@Valid @RequestBody OrderBloodReceiveRequest request) {
        bloodReceiveService.createOrder(request);
        return ApiResponse.<Void>builder()
                .message("Tạo đơn hoàn tất! Vui lòng chờ để được xét duyệt")
                .build();
    }
    @GetMapping("/list-order/receive")
    public ApiResponse<List<OrderBloodReceiveResponse>> getListOrderReceiveUser(){
        return ApiResponse.<List<OrderBloodReceiveResponse>>builder()
                .data(bloodReceiveService.getOrderForUser())
                .build();
    }
    @GetMapping("/list-blood-valid-bags")
    public ApiResponse<List<BloodBagResponse>> getBloodBagsValid(){
        return ApiResponse.<List<BloodBagResponse>>builder()
                .data(bloodBagService.getBloodBagsValid())
                .build();
    }
    @GetMapping("/list-order-receive-urgent")
    public ApiResponse<List<OrderReceiveUrgentPublicResponse>> getOrderReceiveUgent(){
        return ApiResponse.<List<OrderReceiveUrgentPublicResponse>>builder()
                .data(userService.getOrderReceiveUrgentPublic())
                .build();
    }
}
