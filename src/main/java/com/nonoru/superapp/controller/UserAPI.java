package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.request.OrderBloodReceiveRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.OrderBloodReceiveResponse;
import com.nonoru.superapp.dto.response.OrderDateDonationResponse;
import com.nonoru.superapp.dto.response.UserOrderDonationResponse;
import com.nonoru.superapp.service.OrderBloodDonationService;
import com.nonoru.superapp.service.OrderBloodReceiveService;
import com.nonoru.superapp.service.OrderDateDonationService;
import com.nonoru.superapp.service.UserService;
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
    private OrderBloodReceiveService bloodReceiveService;
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
                .data(dateDonationService.getOrderDateDonationForUser())
                .build();
    }
    @GetMapping("/list-order/{id}")
    public ApiResponse<List<UserOrderDonationResponse>> getListOrder(@PathVariable("id") long id){
        return ApiResponse.<List<UserOrderDonationResponse>>builder()
                .data(userService.getOrderDonationOnlySelf(id))
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

}
