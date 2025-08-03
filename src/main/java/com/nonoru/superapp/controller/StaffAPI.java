package com.nonoru.superapp.controller;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.dto.request.AcceptReceiveOrderRequest;
import com.nonoru.superapp.dto.request.CancelReasonRequest;
import com.nonoru.superapp.dto.request.OrderDateDonationRequest;
import com.nonoru.superapp.dto.response.*;
import com.nonoru.superapp.entity.BloodBag;
import com.nonoru.superapp.entity.BloodType;
import com.nonoru.superapp.entity.CancellationReason;
import com.nonoru.superapp.entity.Clinic;
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
    private OrderDateDonationService dateDonationService;

    @Autowired
    private ClinicService clinicService;

    @Autowired
    private CancellationReasonService cancellationReasonService;

    @Autowired
    private BloodService bloodService;

    @Autowired
    private BloodBagService bloodBagService;

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

    @GetMapping("/list-schedules")
    public ApiResponse<List<OrderDateDonationResponse>> getOrderDate(){
        return ApiResponse.<List<OrderDateDonationResponse>>builder()
                .data(dateDonationService.getOrderDateDonation())
                .build();
    }

    @GetMapping("/cancel-reason")
    public ApiResponse<List<CancellationReason>> listCancellationReasons(){
        return ApiResponse.<List<CancellationReason>>builder()
                .data(cancellationReasonService.findAll())
                .build();
    }

    @GetMapping("/list-bloods")
    public ApiResponse<List<BloodType>> getBloodTypes(){
        return ApiResponse.<List<BloodType>>builder()
                .data(bloodService.getAllBloodTypes())
                .build();
    }

    @GetMapping("/list-blood-bags")
    public ApiResponse<List<BloodBagResponse>> getBloodBags(){
        return ApiResponse.<List<BloodBagResponse>>builder()
                .data(bloodBagService.getAllBloodBagsForStaff())
                .build();
    }
    @GetMapping("/list-blood-valid-bags")
    public ApiResponse<List<BloodBagResponse>> getBloodBagsValid(){
        return ApiResponse.<List<BloodBagResponse>>builder()
                .data(bloodBagService.getBloodBagsValid())
                .build();
    }
    

    

//    @GetMapping("/blood")
//    public ApiResponse<List<BloodStorageResponse<BloodStorageChangeDTO>>> getBloodStorage(){
//        return ApiResponse.<List<BloodStorageResponse<BloodStorageChangeDTO>>>builder()
//                .data(bloodService.getAllBloodStorage())
//                .build();
//    }
//    @GetMapping("/statistic/today")
//    public ApiResponse<BloodOrderStaticResponse> getStatisticToday(){
//        return ApiResponse.<BloodOrderStaticResponse>builder()
//                .data(bloodService.getBloodDonateStatic(0, false))
//                .build();
//    }
//    @GetMapping("/statistic/yesterday")
//    public ApiResponse<BloodOrderStaticResponse> getStatisticYesterday(){
//        return ApiResponse.<BloodOrderStaticResponse>builder()
//                .data(bloodService.getBloodDonateStatic(1, false))
//                .build();
//    }
//    @GetMapping("/statistic/month")
//    public ApiResponse<BloodOrderStaticResponse> getStatisticMonth(){
//        return ApiResponse.<BloodOrderStaticResponse>builder()
//                .data(bloodService.getBloodDonateStatic(0, true))
//                .build();
//    }
//    @GetMapping("/statistic/receive/today")
//    public ApiResponse<BloodOrderStaticResponse> getStatisticReceiveToday(){
//        return ApiResponse.<BloodOrderStaticResponse>builder()
//                .data(bloodService.getBloodReceiveStatic(0, false))
//                .build();
//    }
//    @GetMapping("/statistic/receive/yesterday")
//    public ApiResponse<BloodOrderStaticResponse> getStatisticReceiveYesterday(){
//        return ApiResponse.<BloodOrderStaticResponse>builder()
//                .data(bloodService.getBloodReceiveStatic(1, false))
//                .build();
//    }
//    @GetMapping("/statistic/receive/month")
//    public ApiResponse<BloodOrderStaticResponse> getStatisticReceiveMonth(){
//        return ApiResponse.<BloodOrderStaticResponse>builder()
//                .data(bloodService.getBloodReceiveStatic(0, true))
//                .build();
//    }
//    @GetMapping("/statistic/blood/graph")
//    public ApiResponse<List<BloodStatisticResponse>> getBloodStatisticGraph(){
//        return ApiResponse.<List<BloodStatisticResponse>>builder()
//                .data(bloodService.getAllBloodStorageForStatistic())
//                .build();
//    }
}
