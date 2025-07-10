package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.response.BloodOrderStaticResponse;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
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
    @Autowired
    private BloodStorageRepository bloodStorageRepo;

    /* CREATE BLOOD DONATION ORDERs - USER*/
    public void createOrderBloodDonation(OrderBloodDonationRequest request) {
        long timePreOrder
                = checkPreOrder() != null ? ChronoUnit.DAYS.between(checkPreOrder(), LocalDate.now()) : 0;
        if(timePreOrder < 60){
            throw new AppException(ErrorCode.TIME_INVALID_FOR_NEXT_ORDER);
        }
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
    public LocalDate checkPreOrder(){
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idJwt = jwt.getClaim("id");
        List<OrderBloodDonation> orders = orderDonationRepo.findAllByUserAccount_Id(idJwt);
        orders.removeIf(order -> order.getStatus() != StatusOfOrderDonation.COMPLETED.getStatusCode());
        OrderBloodDonation order = orders.stream().max(Comparator.comparing(x -> x.getOrderDate().getOrderDate())).orElse(null);
        return order.getOrderDate().getOrderDate();
    }
    public List<OrderBloodDonationResponse> getListOrderBloodDonationWaitingToAccept(StatusOfOrderDonation sts) {
        List<OrderBloodDonation> listOrder = orderDonationRepo.findAll();
        List<OrderBloodDonationResponse> response = new ArrayList<>();
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        listOrder.forEach(order -> {
            LocalDate orderDate = order.getOrderDate().getOrderDate();
            LocalTime orderTime = order.getOrderDate().getOrderTime();
            if((today.isEqual(orderDate) && now.isBefore(orderTime) || today.isBefore(orderDate))){
                if(order.getStatus() == sts.getStatusCode())
                {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                    String orderDateStr = orderDate.format(formatter);
                    String dob = order.getDob().format(formatter);
                    String createDate = order.getCreateDate().format(formatter);

                    OrderBloodDonationResponse orderResponse = OrderBloodDonationResponse.builder()
                            .orderDonationId(order.getOrderDonationId())
                            .fullName(order.getFullName())
                            .phone(order.getPhone())
                            .bloodType(order.getBlood().getBloodType())
                            .amountBloodMl(order.getAmountBloodMl())
                            .orderDate(orderDateStr)
                            .orderTime(orderTime)
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
            }
        });
        return response;
    }
    public List<OrderBloodDonationResponse> getAllOrder() {
        List<OrderBloodDonation> listOrder = orderDonationRepo.findAll();
        List<OrderBloodDonationResponse> response = new ArrayList<>();
        listOrder.forEach(order -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String orderDate = order.getOrderDate().getOrderDate().format(formatter);
            String dob = order.getDob().format(formatter);
            String createDate = order.getCreateDate().format(formatter);
            LocalTime orderTime = order.getOrderDate().getOrderTime();
            OrderBloodDonationResponse orderResponse = OrderBloodDonationResponse.builder()
                    .orderDonationId(order.getOrderDonationId())
                    .fullName(order.getFullName())
                    .phone(order.getPhone())
                    .bloodType(order.getBlood().getBloodType())
                    .amountBloodMl(order.getAmountBloodMl())
                    .orderDate(orderDate)
                    .orderTime(orderTime)
                    .createByUsername(order.getUserAccount().getUsername())
                    .dob(dob)
                    .createDate(createDate)
                    .gender(order.getGender())
                    .weight(order.getWeight())
                    .cccdNumber(order.getCccdNumber())
                    .address(order.getAddress())
                    .statusCode(order.getStatus())
                    .build();
            response.add(orderResponse);
        });
        return response;
    }
    /* SET STATUS FOR ORER DONATION - STAFF */
    public void acceptOrderBloodDonation(long orderDonationId) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBD.setStatus(StatusOfOrderDonation.COMFRIMMED.getStatusCode());
        orderDonationRepo.save(orBD);
    }
    public void refuseOrderBloodDonation(long orderDonationId, String reason) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBD.setReason(reason);
        orBD.setStatus(StatusOfOrderDonation.REFUSED.getStatusCode());
        orderDonationRepo.save(orBD);
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public String completeOrderBloodDonation(long orderDonationId) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBD.setStatus(StatusOfOrderDonation.COMPLETED.getStatusCode());
        getBloodFromOrder(orBD.getBlood(), orBD.getAmountBloodMl());
        orderDonationRepo.save(orBD);
        return "Đã thêm thành công "+ orBD.getAmountBloodMl() + " ml nhóm " +orBD.getBlood().getBloodType()+" vào trong kho máu";
    }
    public void cancelOrderBloodDonation(long orderDonationId, String reason) {
        OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBD.setReason(reason);
        orBD.setStatus(StatusOfOrderDonation.CANCELED.getStatusCode());
        orderDonationRepo.save(orBD);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('STAFF')")
    public void getBloodFromOrder(BloodStorage bloodStorage, float amount) {
        float oldAmount = bloodStorage.getStorage();
        bloodStorage.setStorage(oldAmount + amount);
        bloodStorageRepo.save(bloodStorage);
    }

}
