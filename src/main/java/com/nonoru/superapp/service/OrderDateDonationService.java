package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.OrderDateDonationRequest;
import com.nonoru.superapp.dto.response.OrderDateDonationResponse;
import com.nonoru.superapp.entity.Clinic;
import com.nonoru.superapp.entity.OrderDateDonation;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.ClinicRepository;
import com.nonoru.superapp.repository.OrderDateDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderDateDonationService {
    @Autowired
    private OrderDateDonationRepository orderDateRepo;
    @Autowired
    private ClinicRepository clinicRepo;
    /* CREATE DATE ORDER DONATION - STAFF */
    public void create(OrderDateDonationRequest request){
        Integer wrongTime =
                orderDateRepo.existsByOrderDateAndOrderTime(request.getOrderDate(), request.getOrderTime());
        if(wrongTime > 0){
            throw new AppException(ErrorCode.ORDER_TIME_EXISTED_IN_DAY);
        }
        Clinic clinic = clinicRepo.findById(request.getClinicId()).orElseThrow(()
        -> new AppException(ErrorCode.CLINIC_ID_NOTFOUND));
        OrderDateDonation date = OrderDateDonation.builder()
                .orderDate(request.getOrderDate())
                .orderTime(request.getOrderTime())
                .clinic(clinic)
                .build();
        orderDateRepo.save(date);
    }

    /* GET INFO DATE ORDER - USER, STAFF*/
    public List<OrderDateDonationResponse> getOrderDateDonation(){
        List<OrderDateDonation> listDate = orderDateRepo.findAll();
        List<OrderDateDonationResponse> responses = new ArrayList<>();
        listDate.forEach(orD -> {
            Integer nP = orderDateRepo.countOrderByOrderDateAndTime(orD.getOrderDate(), orD.getOrderTime());
            if(nP == null){
                nP = 0;
            }
            OrderDateDonationResponse orDR = OrderDateDonationResponse.builder()
                    .orderDateId(orD.getOrderDateId())
                    .orderDate(orD.getOrderDate())
                    .orderTime(orD.getOrderTime())
                    .numberOfPeople(nP)
                    .build();
            responses.add(orDR);
        });
        return responses;
    }
    /**/
}
