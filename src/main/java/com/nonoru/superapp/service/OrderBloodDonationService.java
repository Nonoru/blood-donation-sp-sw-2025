package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.AcceptDonationOrderRequest;
import com.nonoru.superapp.dto.request.CancelReasonRequest;
import com.nonoru.superapp.dto.request.OrderBloodDonationRequest;
import com.nonoru.superapp.dto.response.BloodStatisticResponse;
import com.nonoru.superapp.dto.response.OrderBloodDonationForStaff;
import com.nonoru.superapp.dto.response.OrderBloodDonationResponse;
import com.nonoru.superapp.entity.*;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderBloodDonationService {
    @Autowired
    private OrderBloodDonationRepository orderDonationRepo;
    @Autowired
    private BloodTypeRepository bloodRepo;
    @Autowired
    private OrderDateDonationRepository orderDateRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private CancellationReasonRepository cancellationReasonRepo;
    @Autowired
    private BloodBagRepository bloodBagRepo;

    /* CREATE BLOOD DONATION ORDERs - USER*/
    public void createOrderBloodDonation(OrderBloodDonationRequest request) {
        int age = LocalDate.now().getYear() - request.getDob().getYear();
        if(age < 18){
            throw new AppException(ErrorCode.YEAR_LOWER_18);
        }
        OrderDateDonation orderDate = orderDateRepo.findById(request.getOrderDateId()).orElseThrow(()
                -> new AppException(ErrorCode.ORDER_DATE_ID_NOTFOUND));

        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idUser = jwt.getClaim("id");
        UserAccount userAccount = userRepo.findById(idUser).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOTFOUND));

        String gender = request.getGender() == 1 ? "Nam" : "Nữ";

        OrderBloodDonation order = OrderBloodDonation.builder()
                .fullName(request.getFullName())
                .dob(request.getDob())
                .gender(gender)
                .cccdNumber(request.getCccdNumber())
                .phone(request.getPhone())
                .address(request.getAddress())
                .orderDate(orderDate)
                .userAccount(userAccount)
                .status(StatusOfOrderDonation.PENDING.getStatusCode())
                .build();
        orderDonationRepo.save(order);
    }
//     /* GET LIST BLOOD DONATION ORDERS - STAFF */
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
                     String dob = order.getDob().format(formatter);
                     String createDate = order.getCreateDate().format(formatter);

                     OrderBloodDonationResponse orderResponse = OrderBloodDonationResponse.builder()
                             .orderDonationId(order.getOrderDonationId())
                             .fullName(order.getFullName())
                             .phone(order.getPhone())
                             .orderDate(orderDate)
                             .orderTime(orderTime)
                             .createByUsername(order.getUserAccount().getUsername())
                             .dob(dob)
                             .createDate(createDate)
                             .gender(order.getGender())
                             .cccdNumber(order.getCccdNumber())
                             .address(order.getAddress())
                             .build();
                     response.add(orderResponse);
                 }
             }
            });
         return response;
     }
//     /* SET STATUS FOR ORER DONATION - STAFF */
     public void acceptOrderBloodDonation(long orderDonationId) {
         OrderBloodDonation orBD = orderDonationRepo.findById(orderDonationId)
                 .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
         orBD.setStatus(StatusOfOrderDonation.PROCESSING.getStatusCode());
         orderDonationRepo.save(orBD);
     }

     public void updNegativeStatus(CancelReasonRequest request, int type) {
         OrderBloodDonation orBD = orderDonationRepo.findById(request.getOrderDonationId())
                 .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
         CancellationReason reason = cancellationReasonRepo.findById(request.getCancelReasonId()).orElseThrow(() ->
                 new AppException(ErrorCode.CANCELREASON_ISNULL));
         orBD.setCancelReason(reason);
         if(orBD.getCancelReason().getCancellationReasonId() == 1){
             if(request.getOtherReason() == null || request.getOtherReason().isEmpty()){
                 throw new AppException(ErrorCode.OTHER_REASON_ISBLANK);
             }
             if(request.getOtherReason().length() > 300){
                 throw new AppException(ErrorCode.OTHER_REASON_LENGTH_INVALID);
             }
             orBD.setOtherReason(request.getOtherReason());
         }
         if (type == StatusOfOrderDonation.REFUSED.getStatusCode()) {
             orBD.setStatus(StatusOfOrderDonation.REFUSED.getStatusCode());
         }
         if (type == StatusOfOrderDonation.CANCELED.getStatusCode()) {
             bloodRepo.findById(request.getBloodType()).ifPresent(orBD::setBlood);
             orBD.setStatus(StatusOfOrderDonation.CANCELED.getStatusCode());
         }
         orderDonationRepo.save(orBD);
     }

     public String completeOrderBloodDonation(AcceptDonationOrderRequest request) {
         OrderBloodDonation orBD = orderDonationRepo.findById(request.getOrderDonationId())
                 .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

         BloodType blood  = bloodRepo.findById(request.getBloodType())
                 .orElseThrow(() -> new AppException(ErrorCode.BLOOD_ID_NOTFOUND));

         LocalDateTime collectionDate = LocalDateTime.now();

         BloodBag newBloodBag = BloodBag.builder()
                 .bloodType(blood)
                 .volumeMl(request.getVolumeMl())
                 .collectionDate(collectionDate)
                 .expiryDate(request.getExpiryDate())
                 .orderBloodDonation(orBD)
                 .build();

         bloodBagRepo.save(newBloodBag);

         orBD.setBlood(blood);
         orBD.setStatus(StatusOfOrderDonation.COMPLETED.getStatusCode());
         orBD.setAmountBloodDonation(request.getVolumeMl());
         orderDonationRepo.save(orBD);
         return "Đã tạo thành công 1 túi máu "+newBloodBag.getBloodType().getBloodType()+" : "+newBloodBag.getVolumeMl()+"ml";
     }

    public List<OrderBloodDonationForStaff> listAllOrderForStaff() {
        List<OrderBloodDonation> listOrder = orderDonationRepo.findAll();
        List<OrderBloodDonationForStaff> responses = new ArrayList<>();
        listOrder.forEach(order -> {
            String bloodType = null;
            BloodType blood = order.getBlood();
            if(blood != null){
                bloodType = blood.getBloodType();
            }

            String cancelReason = null;
            CancellationReason cancellationReason = order.getCancelReason();
            if(cancellationReason != null){
                cancelReason = cancellationReason.getCancellationReasonName();
            }

            float volumeMl = order.getAmountBloodDonation();

            OrderBloodDonationForStaff orderForStaff = OrderBloodDonationForStaff.builder()
                    .orderDonationId(order.getOrderDonationId())
                    .fullName(order.getFullName())
                    .cccdNumber(order.getCccdNumber())
                    .phone(order.getPhone())
                    .bloodType(bloodType)
                    .orderDate(order.getOrderDate().getOrderDate())
                    .orderTime(order.getOrderDate().getOrderTime())
                    .createDate(order.getCreateDate())
                    .cancelReason(cancelReason)
                    .status(order.getStatus())
                    .amountBloodDonation(volumeMl)
                    .build();
            responses.add(orderForStaff);
        });

        return responses;
    }


     public BloodStatisticResponse statisticOrderBloodDonation() {
        // Tính ngày bắt đầu (30 ngày trước)
        LocalDate startDate = LocalDate.now().minusDays(30);
        
        // Lấy tổng số đơn trong 30 ngày
        int totalOrders = orderDonationRepo.countOrdersInLast30Days(startDate);
        
        // Lấy số đơn thành công (status = 3)
        int successfulOrders = orderDonationRepo.countSuccessfulOrdersInLast30Days(startDate);
        
        // Lấy số đơn từ chối (status = 4,5)
        int rejectedOrders = orderDonationRepo.countRejectedOrdersInLast30Days(startDate);
        
        // Lấy danh sách đơn từ chối để thống kê lý do
        List<OrderBloodDonation> rejectedOrderList = orderDonationRepo.findRejectedOrdersInLast30Days(startDate);
        
        // Thống kê lý do từ chối
        Map<String, Integer> rejectionReasons = new HashMap<>();
        
        for (OrderBloodDonation order : rejectedOrderList) {
            if (order.getCancelReason() != null) {
                String reasonName = order.getCancelReason().getCancellationReasonName();
                rejectionReasons.put(reasonName, rejectionReasons.getOrDefault(reasonName, 0) + 1);
            }
        }
        
        return BloodStatisticResponse.builder()
                .totalOrders(totalOrders)
                .successfulOrders(successfulOrders)
                .rejectedOrders(rejectedOrders)
                .rejectionReasons(rejectionReasons)
                .period("30 ngày gần nhất")
                .build();
     }


}
