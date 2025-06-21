package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.OrderDateDonationRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.OrderBloodDonationResponse;
import com.nonoru.superapp.entity.Clinic;
import com.nonoru.superapp.service.ClinicService;
import com.nonoru.superapp.service.OrderBloodDonationService;
import com.nonoru.superapp.service.OrderDateDonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "http://localhost:3000/")
public class StaffAPI {
    @Autowired
    private OrderBloodDonationService bloodDonationService;
    @Autowired
    private OrderDateDonationService dateDonationService;
    @Autowired
    private ClinicService clinicService;

    @GetMapping("/list-order-donation")
    public ApiResponse<List<OrderBloodDonationResponse>> getDonationOrders (){
        return ApiResponse.<List<OrderBloodDonationResponse>>builder()
                .data(bloodDonationService.getListOrderBloodDonationWaitingToAccept())
                .build();
    }

    @GetMapping("/create-date-donation")
    public ApiResponse<Void> createDateDonation(@RequestBody @Valid OrderDateDonationRequest request){
        dateDonationService.create(request);
        return ApiResponse.<Void>builder()
                .message("Tạo ngày hẹn xét nghiệm hoàn tất")
                .build();
    }

    @GetMapping("/list-clinics")
    public ApiResponse<List<Clinic>> getClinics(){
        return ApiResponse.<List<Clinic>>builder()
                .data(clinicService.getAllClinics())
                .build();
    }

    @PutMapping("/accept-orders/{id}")
    public ApiResponse<Void> acceptOrder(@PathVariable("id") long id){
        bloodDonationService.acceptOrderBloodDonation(id);
        return ApiResponse.<Void>builder()
                .message("Đơn đã được xét duyệt")
                .build();
    }
    @PutMapping("/refuse-orders/{id}")
    public ApiResponse<Void> refuseOrder(@PathVariable("id") long id){
        bloodDonationService.refuseOrderBloodDonation(id);
        return ApiResponse.<Void>builder()
                .message("Đơn đã được từ chối")
                .build();
    }
    @PutMapping("/complete-orders/{id}")
    public ApiResponse<Void> completeOrder(@PathVariable("id") long id){
        bloodDonationService.completeOrderBloodDonation(id);
        return ApiResponse.<Void>builder()
                .message("Đơn đã hoàn tất")
                .build();
    }
    @PutMapping("/cancel-orders/{id}")
    public ApiResponse<Void> cancelOrder(@PathVariable("id") long id){
        bloodDonationService.cancelOrderBloodDonation(id);
        return ApiResponse.<Void>builder()
                .message("Đơn đã bị hủy")
                .build();
    }
}
