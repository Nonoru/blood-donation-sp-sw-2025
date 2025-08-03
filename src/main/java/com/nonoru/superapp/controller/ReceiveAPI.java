package com.nonoru.superapp.controller;


import com.nonoru.superapp.dto.request.AcceptReceiveOrderRequest;
import com.nonoru.superapp.dto.request.CancelReasonReceiveRequest;
import com.nonoru.superapp.dto.request.CancelReasonRequest;
import com.nonoru.superapp.dto.response.ApiResponse;
import com.nonoru.superapp.dto.response.OrderBloodReceiveResponse;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.enums.StatusOfOrderReceiving;
import com.nonoru.superapp.service.BloodBagService;
import com.nonoru.superapp.service.OrderBloodReceiveService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/staff/receive")
@CrossOrigin(origins = "http://localhost:3000/")
public class ReceiveAPI {
    @Autowired
    private OrderBloodReceiveService orderBloodReceiveService;

    @Autowired
    private BloodBagService bloodBagService;


    @GetMapping("/list-order/all")
    public ApiResponse<List<OrderBloodReceiveResponse>> getAllReceiveOrders () {
        return ApiResponse.<List<OrderBloodReceiveResponse>>builder()
                .data(orderBloodReceiveService.getAllOrder())
                .build();
    }
    @GetMapping("/list-order/receive-pending")
    public ApiResponse<List<OrderBloodReceiveResponse>> getReceiveOrderPending () {
        return ApiResponse.<List<OrderBloodReceiveResponse>>builder()
                .data(orderBloodReceiveService.getOrderByType(StatusOfOrderDonation.PENDING.getStatusCode()))
                .build();
    }
    @GetMapping("/list-order/receive-processing")
    public ApiResponse<List<OrderBloodReceiveResponse>> getReceiveOrderProcessing () {
        return ApiResponse.<List<OrderBloodReceiveResponse>>builder()
                .data(orderBloodReceiveService.getOrderByType(StatusOfOrderDonation.PROCESSING.getStatusCode()))
                .build();
    }
    @PutMapping("/refuse-orders")
    public ApiResponse<Void> refuseOrderReceive(@RequestBody CancelReasonReceiveRequest request) {
        orderBloodReceiveService.updNegativeOrderReceiving(request, StatusOfOrderReceiving.REFUSED.getStatusCode());
        return ApiResponse.<Void>builder()
                .message("Đơn đã được từ chối")
                .build();
    }
    @PutMapping("/cancel-orders")
    public ApiResponse<Void> cancelOrderReceive(@RequestBody CancelReasonReceiveRequest request) {
        orderBloodReceiveService.updNegativeOrderReceiving(request, StatusOfOrderReceiving.CANCELED.getStatusCode());
        return ApiResponse.<Void>builder()
                .message("Đơn đã được hủy")
                .build();
    }

    @PutMapping("/accept-orders")
    public ApiResponse<Void> acceptReceiveOrder(@RequestBody @Valid AcceptReceiveOrderRequest request){
        bloodBagService.updateBloodBagsForReceiveOrder(request);
        orderBloodReceiveService.acceptOrderReceive(request.getEstimateDate(), request.getOrderReceivingId());
        return ApiResponse.<Void>builder()
                .message("Duyệt đơn nhận máu thành công")
                .build();
    }
    @PutMapping("/complete-orders/{id}")
    public ApiResponse<Void> completeReceiveOrder(@PathVariable("id") Long id){
        orderBloodReceiveService.completeOrderReceive(id);
        return ApiResponse.<Void>builder()
                .message("Hoàn tất đơn nhận máu")
                .build();
    }
}
