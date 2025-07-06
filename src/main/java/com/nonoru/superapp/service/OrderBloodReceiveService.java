package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.OrderBloodReceiveRequest;
import com.nonoru.superapp.dto.response.OrderBloodReceiveResponse;
import com.nonoru.superapp.entity.*;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.BloodStorageRepository;
import com.nonoru.superapp.repository.ClinicRepository;
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
    @Autowired
    private ClinicRepository clinicRepo;

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
            String clinicName = null;
            if( order.getClinic() != null){
                clinicName = order.getClinic().getClinicName();
            }
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
                    .createdByUsername(order.getUserAccount().getUsername())
                    .clinicName(clinicName)
                    .build();
            responses.add(o);
        });
        return responses;
    }
    public List<OrderBloodReceiveResponse> getOrderByStatus(StatusOfOrderDonation status){
        List<OrderBloodReceiveResponse> responses = new ArrayList<>();
        List<OrderBloodReceive> orders = orBReceiveRepo.findAll();
        orders.forEach(order -> {
            if(order.getStatus() == status.getStatusCode()){
                String clinicName = null;
                if( order.getClinic() != null){
                    clinicName = order.getClinic().getClinicName();
                }
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
                        .createdByUsername(order.getUserAccount().getUsername())
                        .clinicName(clinicName)
                        .build();
                responses.add(o);
            }
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

    public void acceptOrderBloodReceive(long orderReceiveId, int clinicId) {
        Clinic clinic = clinicRepo.findById(clinicId).orElseThrow(
                () -> new AppException(ErrorCode.CLINIC_ID_NOTFOUND)
        );
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setStatus(StatusOfOrderDonation.COMFRIMMED.getStatusCode());
        orBS.setClinic(clinic);
        orBReceiveRepo.save(orBS);
    }
    public void refuseOrderBloodReceive(long orderReceiveId, String reason) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setReasonCancel(reason);
        orBS.setStatus(StatusOfOrderDonation.REFUSED.getStatusCode());
        orBReceiveRepo.save(orBS);
    }
    public String completeOrderBloodReceive(long orderReceiveId) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        BloodStorage bloodStorage = bStorageRepo.findById(orBS.getBlood().getId()).orElseThrow(
                () -> new AppException(ErrorCode.BLOOD_ID_NOTFOUND)
        );
        float curAmount = bloodStorage.getStorage();

        if(orBS.getAmountBloodMl() < curAmount) {
            orBS.setStatus(StatusOfOrderDonation.COMPLETED.getStatusCode());
            orBS.setDoneDate(LocalDate.now());
            orBReceiveRepo.save(orBS);

            bloodStorage.setStorage(curAmount - orBS.getAmountBloodMl());
            bStorageRepo.save(bloodStorage);
            return "Đã trừ thành công " + orBS.getAmountBloodMl() + " ml nhóm " + orBS.getBlood().getBloodType() + " trong kho máu";
        }else{
            throw new AppException(ErrorCode.BLOOD_NOT_ENOUGH);
        }
    }
    public void cancelOrderBloodReceive(long orderReceiveId, String reason) {
        OrderBloodReceive orBS = orBReceiveRepo.findById(orderReceiveId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBS.setReasonCancel(reason);
        orBS.setStatus(StatusOfOrderDonation.CANCELED.getStatusCode());
        orBReceiveRepo.save(orBS);
    }
}
