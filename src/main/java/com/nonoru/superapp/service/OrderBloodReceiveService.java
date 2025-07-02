package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.OrderBloodReceiveRequest;
import com.nonoru.superapp.dto.response.OrderBloodReceiveResponse;
import com.nonoru.superapp.entity.BloodStorage;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.OrderBloodReceive;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.BloodStorageRepository;
import com.nonoru.superapp.repository.OrderBloodReceiveRepository;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderBloodReceiveService {
    @Autowired
    private OrderBloodReceiveRepository orBReceiveRepo;
    @Autowired
    private BloodStorageRepository bStorageRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserService userService;

    public void createOrder(OrderBloodReceiveRequest request){
        String typeOrder = request.getStatusType();
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idUser = jwt.getClaim("id");

        if(!(typeOrder.equals("normal") || typeOrder.equals("urgent"))){
            throw new AppException(ErrorCode.TYPE_OF_RECEIVING_ORDER_INVALID);
        }

        BloodStorage bs = bStorageRepo.findById(request.getBloodId()).orElseThrow(() -> new AppException(ErrorCode.BLOOD_ID_NOTFOUND));

        UserAccount userAccount = userRepo.findById(idUser).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOTFOUND));

        OrderBloodReceive order = OrderBloodReceive.builder()
                .fullName(request.getFullName())
                .amountBloodMl(request.getAmountBloodMl())
                .cccdNumber(String.valueOf(request.getCccdNumber()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .reason(request.getReason())
                .createDate(LocalDate.now())
                .blood(bs)
                .userAccount(userAccount)
                .status(StatusOfOrderDonation.PROCESSING.getStatusCode())
                .type(typeOrder)
                .build();
        orBReceiveRepo.save(order);
    }

    public List<OrderBloodReceiveResponse> getAllOrder(){
        List<OrderBloodReceiveResponse> responses = new ArrayList<>();
        List<OrderBloodReceive> orders = orBReceiveRepo.findAll();
        orders.forEach(order -> {
            OrderBloodReceiveResponse o = OrderBloodReceiveResponse.builder()
                    .orderId(order.getOrderReceivingId())
                    .fullName(order.getFullName())
                    .amountBloodMl(order.getAmountBloodMl())
                    .cccdNumber(order.getCccdNumber())
                    .phone(order.getPhone())
                    .address(order.getAddress())
                    .reason(order.getReason())
                    .createDate(order.getCreateDate())
                    .bloodType(order.getBlood().getBloodType())
                    .status(order.getStatus())
                    .type(order.getType())
                    .build();
            responses.add(o);
        });
        return responses;
    }
    public List<OrderBloodReceiveResponse> getOrderForUser(){
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idUser = jwt.getClaim("id");

        List<OrderBloodReceiveResponse> responses = new ArrayList<>();
        List<OrderBloodReceive> orders = orBReceiveRepo.findAllByUserAccount_Id(idUser);
        orders.forEach(order -> {
            OrderBloodReceiveResponse o = OrderBloodReceiveResponse.builder()
                    .orderId(order.getOrderReceivingId())
                    .fullName(order.getFullName())
                    .amountBloodMl(order.getAmountBloodMl())
                    .address(order.getAddress())
                    .reason(order.getReason())
                    .createDate(order.getCreateDate())
                    .bloodType(order.getBlood().getBloodType())
                    .status(order.getStatus())
                    .type(order.getType())
                    .build();
            responses.add(o);
        });
        return responses;
    }

    public void acceptOrderBloodReceive(long orderReceiveId) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setStatus(StatusOfOrderDonation.COMFRIMMED.getStatusCode());
        orBReceiveRepo.save(orBS);
    }
    public void refuseOrderBloodReceive(long orderReceiveId, String reason) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setReason(reason);
        orBS.setStatus(StatusOfOrderDonation.REFUSED.getStatusCode());
//        orBS.setClinic;
        orBReceiveRepo.save(orBS);
    }
    public String completeOrderBloodReceive(long orderReceiveId) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setStatus(StatusOfOrderDonation.COMPLETED.getStatusCode());
        orBReceiveRepo.save(orBS);
        return "Đã thêm thành công "+ orBS.getAmountBloodMl() + " ml nhóm " +orBS.getBlood().getBloodType()+" vào trong kho máu";
    }
    public void cancelOrderBloodReceive(long orderReceiveId, String reason) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setReason(reason);
        orBS.setStatus(StatusOfOrderDonation.CANCELED.getStatusCode());
        orBReceiveRepo.save(orBS);
    }
}
