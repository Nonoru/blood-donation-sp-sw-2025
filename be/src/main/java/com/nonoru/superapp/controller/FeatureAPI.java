package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.service.OrderBloodDonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feature")
@CrossOrigin(origins = "http://localhost:3000/")
public class FeatureAPI {
    @Autowired
    private OrderBloodDonationService bloodDonationService;
    @PostMapping("/order-donation")
    public ApiResponse<Void> createOrder(@RequestBody @Valid OrderBloodDonationRequest request) {
        bloodDonationService.createOrderBloodDonation(request);
        return ApiResponse.<Void>builder()
                .message("Tạo đơn hoàn tất! Vui lòng chờ để được xét duyệt")
                .build();
    }
}
