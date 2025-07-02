package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.request.OrderDateDonationRequest;
import com.nonoru.superapp.dto.response.*;
import com.nonoru.superapp.entity.Clinic;
import com.nonoru.superapp.entity.OrderBloodReceive;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @Autowired
    private BloodService bloodService;
    @Autowired
    private OrderBloodReceiveService bloodReceiveService;
    @GetMapping("/list-order")
    public ApiResponse<List<OrderBloodDonationResponse>> getAll () {
        return ApiResponse.<List<OrderBloodDonationResponse>>builder()
                .data(bloodDonationService.getAllOrder())
                .build();
    }
    @GetMapping("/list-order/processing")
    public ApiResponse<List<OrderBloodDonationResponse>> getDonationOrdersProcessing () {
        return ApiResponse.<List<OrderBloodDonationResponse>>builder()
                .data(bloodDonationService.getListOrderBloodDonationWaitingToAccept(StatusOfOrderDonation.PROCESSING))
                .build();
    }
    @GetMapping("/list-order/accept")
    public ApiResponse<List<OrderBloodDonationResponse>> getDonationOrdersConfirmed (){
        return ApiResponse.<List<OrderBloodDonationResponse>>builder()
                .data(bloodDonationService.getListOrderBloodDonationWaitingToAccept(StatusOfOrderDonation.COMFRIMMED))
                .build();
    }
    @PostMapping("/create-date-donation")
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
    public ApiResponse<Void> refuseOrder(@PathVariable("id") long id,  @RequestBody Map<String, String> body){
        String reason = body.get("reason");
        bloodDonationService.refuseOrderBloodDonation(id, reason);
        return ApiResponse.<Void>builder()
                .message("Đơn đã được từ chối")
                .build();
    }
    @PutMapping("/complete-orders/{id}")
    public ApiResponse<String> completeOrder(@PathVariable("id") long id){
        String res = bloodDonationService.completeOrderBloodDonation(id);
        return ApiResponse.<String>builder()
                .message("Đơn đã hoàn tất")
                .data(res)
                .build();
    }
    @PutMapping("/cancel-orders/{id}")
    public ApiResponse<Void> cancelOrder(@PathVariable("id") long id, @RequestBody Map<String, String> reason){
        bloodDonationService.cancelOrderBloodDonation(id, reason.get("reason"));
        return ApiResponse.<Void>builder()
                .message("Đơn đã bị hủy")
                .build();
    }
    @GetMapping("/list-schedules")
    public ApiResponse<List<OrderDateDonationResponse>> getOrderDate(){
        return ApiResponse.<List<OrderDateDonationResponse>>builder()
                .data(dateDonationService.getOrderDateDonationForStaff())
                .build();
    }
    @GetMapping("/statistic/today")
    public ApiResponse<BloodOrderStaticResponse> getStatisticToday(){
        return ApiResponse.<BloodOrderStaticResponse>builder()
                .data(bloodDonationService.getBloodStaticToday())
                .build();
    }

    @GetMapping("/list-order/receive")
    public ApiResponse<List<OrderBloodReceiveResponse>> getAllReceive () {
        return ApiResponse.<List<OrderBloodReceiveResponse>>builder()
                .data(bloodReceiveService.getAllOrder())
                .build();
    }
    @PutMapping("/accept-orders/receive/{id}")
    public ApiResponse<Void> acceptOrderReceive(@PathVariable("id") long id){
        bloodReceiveService.acceptOrderBloodReceive(id);
        return ApiResponse.<Void>builder()
                .message("Đơn đã được xét duyệt")
                .build();
    }
    @PutMapping("/refuse-orders/receive/{id}")
    public ApiResponse<Void> refuseOrderReceive(@PathVariable("id") long id,  @RequestBody Map<String, String> body){
        String reason = body.get("reason");
        bloodReceiveService.refuseOrderBloodReceive(id, reason);
        return ApiResponse.<Void>builder()
                .message("Đơn đã được từ chối")
                .build();
    }
    @PutMapping("/complete-orders/receive/{id}")
    public ApiResponse<String> completeOrderReceive(@PathVariable("id") long id){
        String res = bloodReceiveService.completeOrderBloodReceive(id);
        return ApiResponse.<String>builder()
                .message("Đơn đã hoàn tất")
                .data(res)
                .build();
    }
    @PutMapping("/cancel-orders/receive/{id}")
    public ApiResponse<Void> cancelOrderReceive(@PathVariable("id") long id, @RequestBody Map<String, String> reason){
        bloodReceiveService.cancelOrderBloodReceive(id, reason.get("reason"));
        return ApiResponse.<Void>builder()
                .message("Đơn đã bị hủy")
                .build();
    }
}
