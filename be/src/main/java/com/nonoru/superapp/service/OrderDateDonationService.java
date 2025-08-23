package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.ClinicDTO;
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

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
        LocalDate dateNow = LocalDate.now();
        LocalTime timeNow = LocalTime.now();
        if(dateNow.isEqual(request.getOrderDate())){
            if(timeNow.isAfter(request.getOrderTime())){
                throw new AppException(ErrorCode.ORDER_TIME_MUST_IN_FUTURE);
            }
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

    /* GET INFO DATE ORDER - USER*/
    public List<OrderDateDonationResponse> getOrderDateDonation(){
        List<OrderDateDonation> listDate = orderDateRepo.findAll();
        List<OrderDateDonationResponse> responses = new ArrayList<>();
        listDate.forEach(orD -> {
            LocalDate dateNow = LocalDate.now();
            if(dateNow.isEqual(orD.getOrderDate()) || dateNow.isBefore(orD.getOrderDate())){
                LocalTime timeNow = LocalTime.now();
                if(timeNow.isBefore(orD.getOrderTime()) || orD.getOrderDate().isAfter(dateNow)) {
                    Integer nP = orderDateRepo.countOrderByOrderDateAndTime(orD.getOrderDate(), orD.getOrderTime());
                    if(nP == null){
                        nP = 0;
                    }

                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                    String date = orD.getOrderDate().format(formatter);
                    OrderDateDonationResponse orDR = OrderDateDonationResponse.builder()
                            .orderDateId(orD.getOrderDateId())
                            .orderDate(date)
                            .orderTime(orD.getOrderTime())
                            .numberOfPeople(nP)
                            .clinicName(orD.getClinic().getClinicName())
                            .build();
                    responses.add(orDR);
                }
            }
        });
        return responses.stream()
                .sorted(Comparator
                        .comparing( OrderDateDonationResponse::getOrderDate )
                        .thenComparing( OrderDateDonationResponse::getOrderTime )
                )
                .collect(Collectors.toList());
    }
    /**/
}
