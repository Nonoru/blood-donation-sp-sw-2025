package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.AcceptDonationOrderRequest;
import com.nonoru.superapp.dto.request.CancelReasonRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.BloodStatisticResponse;
import com.nonoru.superapp.dto.response.OrderBloodDonationForStaff;
import com.nonoru.superapp.dto.response.OrderBloodDonationResponse;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.service.OrderBloodDonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff/donation")
@CrossOrigin(origins = "http://localhost:3000/")
public class DonationAPI {
    @Autowired
    private OrderBloodDonationService bloodDonationService;

    @GetMapping("/list-pending")
    public ApiResponse<List<OrderBloodDonationResponse>> getDonationOrdersProcessing () {
        return ApiResponse.<List<OrderBloodDonationResponse>>builder()
                .data(bloodDonationService.getListOrderBloodDonationWaitingToAccept(StatusOfOrderDonation.PENDING))
                .build();
    }
    @GetMapping("/list-processing")
    public ApiResponse<List<OrderBloodDonationResponse>> getDonationOrdersConfirmed (){
        return ApiResponse.<List<OrderBloodDonationResponse>>builder()
                .data(bloodDonationService.getListOrderBloodDonationWaitingToAccept(StatusOfOrderDonation.PROCESSING))
                .build();
    }
    @GetMapping("/list-all")
    public ApiResponse<List<OrderBloodDonationForStaff>> getAllDonationOrders () {
        return ApiResponse.<List<OrderBloodDonationForStaff>>builder()
                .data(bloodDonationService.listAllOrderForStaff())
                .build();
    }

    @PutMapping("/accept-orders/{id}")
    public ApiResponse<Void> acceptOrder(@PathVariable("id") long id){
        bloodDonationService.acceptOrderBloodDonation(id);
        return ApiResponse.<Void>builder()
                .message("Đơn đã được xét duyệt")
                .build();
    }

    @PutMapping("/refuse-orders")
    public ApiResponse<Void> refuseOrder(@Valid @RequestBody CancelReasonRequest request){
        bloodDonationService.updNegativeStatus(request, StatusOfOrderDonation.REFUSED.getStatusCode());
        return ApiResponse.<Void>builder()
                .message("Đơn đã được từ chối")
                .build();
    }

    @PutMapping("/cancel-orders")
    public ApiResponse<Void> cancelOrder(@Valid @RequestBody CancelReasonRequest request){
        bloodDonationService.updNegativeStatus(request, StatusOfOrderDonation.CANCELED.getStatusCode());
        return ApiResponse.<Void>builder()
                .message("Đơn đã bị hủy")
                .build();
    }
    @PutMapping("/complete-orders")
    public ApiResponse<String> completeOrder(@Valid @RequestBody AcceptDonationOrderRequest request){
        String res = bloodDonationService.completeOrderBloodDonation(request);
        return ApiResponse.<String>builder()
                .message("Đơn đã hoàn tất")
                .data(res)
                .build();
    }
    
    @GetMapping("/statistics")
    public ApiResponse<BloodStatisticResponse> getDonationStatistics(){
        BloodStatisticResponse statistics = bloodDonationService.statisticOrderBloodDonation();
        return ApiResponse.<BloodStatisticResponse>builder()
                .message("Thống kê đơn hiến máu trong 30 ngày gần nhất")
                .data(statistics)
                .build();
    }
}
