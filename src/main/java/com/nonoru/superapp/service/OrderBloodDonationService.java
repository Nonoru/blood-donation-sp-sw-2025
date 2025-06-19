package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
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

@Service
public class OrderBloodDonationService {
    @Autowired
    private OrderBloodDonationRepository bloodDonationRepository;
    @Autowired
    private BloodStorageRepository bloodRepo;
    @Autowired
    private OrderDateDonationRepository orderDateRepo;
    @Autowired
    private UserRepository userRepo;
    public void createOrderBloodDonation(OrderBloodDonationRequest request) {
        int age = LocalDate.now().getYear() - request.getDob().getYear();
        if(age < 18){
            throw new AppException(ErrorCode.YEAR_LOWER_18);
        }
        int ammountBloodAllowToDonate = (int)request.getWeight() * 9;
        if(request.getAmountBloodMl() > ammountBloodAllowToDonate){
            throw  new AppException(ErrorCode.AMMOUNT_BLOOD_ERROR);
        }

        BloodStorage bloodStorage = bloodRepo.findById(request.getBloodId()).orElseThrow(() -> new RuntimeException("There is no blood type"));

        OrderDateDonation orderDate = orderDateRepo.findById(request.getOrderDateId()).orElseThrow(() -> new RuntimeException("There is no order date"));

        UserAccount userAccount = userRepo.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("There is no user account"));

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
                .build();
        bloodDonationRepository.save(order);
    }
}
