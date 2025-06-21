package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.response.OrderBloodDonationResponse;
import com.nonoru.superapp.entity.BloodStorage;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.OrderDateDonation;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.BloodStorageRepository;
import com.nonoru.superapp.repository.OrderBloodDonationRepository;
import com.nonoru.superapp.repository.OrderDateDonationRepository;
import com.nonoru.superapp.repository.UserRepository;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderBloodDonationService {
    @Autowired
    private OrderBloodDonationRepository orderDonationRepo;
    @Autowired
    private BloodStorageRepository bloodRepo;
    @Autowired
    private OrderDateDonationRepository orderDateRepo;
    @Autowired
    private UserRepository userRepo;
    /* CREATE BLOOD DONATION ORDERs - USER*/
    public void createOrderBloodDonation(OrderBloodDonationRequest request) {
        int age = LocalDate.now().getYear() - request.getDob().getYear();
        if(age < 18){
            throw new AppException(ErrorCode.YEAR_LOWER_18);
        }
        int ammountBloodAllowToDonate = (int)request.getWeight() * 9;
        if(request.getAmountBloodMl() > ammountBloodAllowToDonate){
            throw  new AppException(ErrorCode.AMMOUNT_BLOOD_ERROR);
        }

        BloodStorage bloodStorage = bloodRepo.findById(request.getBloodId()).orElseThrow(()
                -> new AppException(ErrorCode.BLOOD_ID_NOTFOUND));

        OrderDateDonation orderDate = orderDateRepo.findById(request.getOrderDateId()).orElseThrow(()
                -> new AppException(ErrorCode.ORDER_DATE_ID_NOTFOUND));

        UserAccount userAccount = userRepo.findById(request.getUserId()).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOTFOUND));

        String gender = request.getGender() == 1 ? "Nam" : "Nữ";

        OrderBloodDonation order = OrderBloodDonation.builder()
                .fullName(request.getFullName())
                .dob(request.getDob())
                .amountBloodMl(request.getAmountBloodMl())
                .gender(gender)
                .weight(request.getWeight())
                .cccdNumber(request.getCccdNumber())
                .phone(request.getPhone())
                .address(request.getAddress())
                .blood(bloodStorage)
                .orderDateId(orderDate)
                .userAccount(userAccount)
                .status(StatusOfOrderDonation.PROCESSING.getStatusCode())
                .createDate(LocalDate.now())
                .build();
        orderDonationRepo.save(order);
    }
    /* GET LIST BLOOD DONATION ORDERS - STAFF */
    public List<OrderBloodDonationResponse> getListOrderBloodDonationWaitingToAccept() {
        List<OrderBloodDonation> listOrder = orderDonationRepo.findAll();
        List<OrderBloodDonationResponse> response = new ArrayList<>();
        listOrder.forEach(order -> {
            if(order.getStatus() == StatusOfOrderDonation.PROCESSING.getStatusCode()){
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                String orderDate = order.getOrderDate().getOrderDate().format(formatter);
                String dob = order.getDob().format(formatter);
                String createDate = order.getCreateDate().format(formatter);

                OrderBloodDonationResponse orderResponse = OrderBloodDonationResponse.builder()
                        .orderDonationId(order.getOrderDonationId())
                        .fullName(order.getFullName())
                        .phone(order.getPhone())
                        .bloodType(order.getBlood().getBloodType())
                        .amountBloodMl(order.getAmountBloodMl())
                        .orderDate(orderDate)
                        .createByUsername(order.getUserAccount().getUsername())
                        .dob(dob)
                        .createDate(createDate)
                        .gender(order.getGender())
                        .weight(order.getWeight())
                        .cccdNumber(order.getCccdNumber())
                        .address(order.getAddress())
                        .build();
                response.add(orderResponse);
            }
        });
        return response;
    }
    /* SET STATUS FOR ORER DONATION - STAFF */
    public void acceptOrderBloodDonation(long orderDonationId) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId).orElse(null);
        orBD.setStatus(StatusOfOrderDonation.COMFRIMMED.getStatusCode());
        orderDonationRepo.save(orBD);
    }
    public void refuseOrderBloodDonation(long orderDonationId) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId).orElse(null);
        orBD.setStatus(StatusOfOrderDonation.REFUSED.getStatusCode());
        orderDonationRepo.save(orBD);
    }
    public void completeOrderBloodDonation(long orderDonationId) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId).orElse(null);
        orBD.setStatus(StatusOfOrderDonation.COMPLETED.getStatusCode());
        orderDonationRepo.save(orBD);
    }
    public void cancelOrderBloodDonation(long orderDonationId) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId).orElse(null);
        orBD.setStatus(StatusOfOrderDonation.CANCELED.getStatusCode());
        orderDonationRepo.save(orBD);
    }
}
