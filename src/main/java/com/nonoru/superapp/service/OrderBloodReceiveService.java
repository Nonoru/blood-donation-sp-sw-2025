package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.CancelReasonReceiveRequest;
import com.nonoru.superapp.dto.request.CancelReasonRequest;
import com.nonoru.superapp.dto.request.OrderBloodReceiveRequest;
import com.nonoru.superapp.dto.response.BloodBagResponse;
import com.nonoru.superapp.dto.response.OrderBloodReceiveResponse;
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
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderBloodReceiveService {
    @Autowired
    private OrderBloodReceiveRepository orBReceiveRepo;
    @Autowired
    private BloodTypeRepository bStorageRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private CancellationReasonRepository cReasonRepo;
    @Autowired
    private BloodBagRepository bloodBagRepository;

    public void createOrder(OrderBloodReceiveRequest request){
        String typeOrder = request.getStatusType();
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idUser = jwt.getClaim("id");

        if(!(typeOrder.equals("normal") || typeOrder.equals("urgent"))){
            throw new AppException(ErrorCode.TYPE_OF_RECEIVING_ORDER_INVALID);
        }

        BloodType bs = bStorageRepo.findById(request.getBloodId()).orElseThrow(() -> new AppException(ErrorCode.BLOOD_ID_NOTFOUND));

        UserAccount userAccount = userRepo.findById(idUser).orElseThrow(()
                -> new AppException(ErrorCode.USER_NOTFOUND));

        OrderBloodReceive order = OrderBloodReceive.builder()
                .fullName(request.getFullName())
                .amountBloodMl(request.getAmountBloodMl())
                .cccdNumber(String.valueOf(request.getCccdNumber()))
                .phone(request.getPhone())
                .address(request.getAddress())
                .userReason(request.getReason())
                .createDate(LocalDate.now())
                .blood(bs)
                .userAccount(userAccount)
                .status(StatusOfOrderDonation.PENDING.getStatusCode())
                .type(typeOrder)
                .build();
        orBReceiveRepo.save(order);
    }
    public List<OrderBloodReceiveResponse> getAllOrder(){
        List<OrderBloodReceiveResponse> responses = new ArrayList<>();
        List<OrderBloodReceive> orders = orBReceiveRepo.findAll();
        orders.forEach(order -> {
            String cancelReasonStr = null;
            CancellationReason cancelReason = order.getCancellationReason();
            if(cancelReason != null){
                if(cancelReason.getCancellationReasonId() != 1){
                    cancelReasonStr = cancelReason.getCancellationReasonName();
                }else
                    cancelReasonStr = order.getOtherCancelReason();
            }
            OrderBloodReceiveResponse o = OrderBloodReceiveResponse.builder()
                    .orderReceivingId(order.getOrderReceivingId())
                    .fullName(order.getFullName())
                    .amountBloodMl(order.getAmountBloodMl())
                    .cccdNumber(order.getCccdNumber())
                    .phone(order.getPhone())
                    .address(order.getAddress())
                    .userReason(order.getUserReason())
                    .createDate(order.getCreateDate())
                    .estimateDate(order.getEstimateDate())
                    .doneDate(order.getDoneDate())
                    .bloodType(order.getBlood().getBloodType())
                    .status(order.getStatus())
                    .type(order.getType())
                    .cancelReason(cancelReasonStr)
                    .createdByUsername(order.getUserAccount().getUsername())
                    .build();
            if(order.getStatus() == StatusOfOrderDonation.PROCESSING.getStatusCode() || order.getStatus() == StatusOfOrderDonation.COMPLETED.getStatusCode()){
                List<BloodBag> bloodBagList = bloodBagRepository.findByOrderBloodReceive(order);
                List<BloodBagResponse> bloodBagResponses = new ArrayList<>();
                bloodBagList.forEach(bloodBag -> {
                    BloodBagResponse bloodBagResponse = BloodBagResponse.builder()
                            .bloodBagId(bloodBag.getBloodBagId())
                            .bloodType(bloodBag.getBloodType().getBloodType())
                            .volumeMl(bloodBag.getVolumeMl())
                            .build();
                    bloodBagResponses.add(bloodBagResponse);
                });
                o.setBloodBagResponses(bloodBagResponses);
            }
            responses.add(o);
        });
        return responses;
    }
    public List<OrderBloodReceiveResponse> getOrderByType(int status){
        List<OrderBloodReceiveResponse> responses = new ArrayList<>();
        List<OrderBloodReceive> orders = orBReceiveRepo.findAllByStatus(status);
        orders.forEach(order -> {
            String cancelReasonStr = null;
            CancellationReason cancelReason = order.getCancellationReason();
            if(cancelReason != null){
                if(cancelReason.getCancellationReasonId() != 1){
                    cancelReasonStr = cancelReason.getCancellationReasonName();
                }else
                    cancelReasonStr = order.getOtherCancelReason();
            }
            OrderBloodReceiveResponse o = OrderBloodReceiveResponse.builder()
                    .orderReceivingId(order.getOrderReceivingId())
                    .fullName(order.getFullName())
                    .amountBloodMl(order.getAmountBloodMl())
                    .cccdNumber(order.getCccdNumber())
                    .phone(order.getPhone())
                    .address(order.getAddress())
                    .userReason(order.getUserReason())
                    .createDate(order.getCreateDate())
                    .bloodType(order.getBlood().getBloodType())
                    .status(order.getStatus())
                    .type(order.getType())
                    .cancelReason(cancelReasonStr)
                    .createdByUsername(order.getUserAccount().getUsername())
                    .build();
            if(status == StatusOfOrderDonation.PROCESSING.getStatusCode()){
                List<BloodBag> bloodBagList = bloodBagRepository.findByOrderBloodReceive(order);
                List<BloodBagResponse> bloodBagResponses = new ArrayList<>();
                bloodBagList.forEach(bloodBag -> {
                    BloodBagResponse bloodBagResponse = BloodBagResponse.builder()
                            .bloodBagId(bloodBag.getBloodBagId())
                            .bloodType(bloodBag.getBloodType().getBloodType())
                            .volumeMl(bloodBag.getVolumeMl())
                            .build();
                    bloodBagResponses.add(bloodBagResponse);
                });
                o.setBloodBagResponses(bloodBagResponses);
            }
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
            String cancelReasonStr = null;
            CancellationReason cancelReason = order.getCancellationReason();
            if(cancelReason != null){
                if(cancelReason.getCancellationReasonId() != 1){
                    cancelReasonStr = cancelReason.getCancellationReasonName();
                }else
                    cancelReasonStr = order.getOtherCancelReason();
            }

            OrderBloodReceiveResponse o = OrderBloodReceiveResponse.builder()
                    .orderReceivingId(order.getOrderReceivingId())
                    .fullName(order.getFullName())
                    .amountBloodMl(order.getAmountBloodMl())
                    .cccdNumber(order.getCccdNumber())
                    .phone(order.getPhone())
                    .address(order.getAddress())
                    .userReason(order.getUserReason())
                    .createDate(order.getCreateDate())
                    .doneDate(order.getDoneDate())
                    .estimateDate(order.getEstimateDate())
                    .bloodType(order.getBlood().getBloodType())
                    .status(order.getStatus())
                    .type(order.getType())
                    .cancelReason(cancelReasonStr)
                    .build();
            responses.add(o);
        });
        return responses;
    }
    public void updNegativeOrderReceiving(CancelReasonReceiveRequest request, int type) {
        OrderBloodReceive orBR = orBReceiveRepo.findById(request.getOrderReceiveId())
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));

        CancellationReason reason = cReasonRepo.findById(request.getCancelReasonId()).orElseThrow(() ->
                new AppException(ErrorCode.CANCELREASON_ISNULL));
        orBR.setCancellationReason(reason);
        if(orBR.getCancellationReason().getCancellationReasonId() == 1){
            if(request.getOtherReason() == null || request.getOtherReason().isEmpty()){
                throw new AppException(ErrorCode.OTHER_REASON_ISBLANK);
            }
            if(request.getOtherReason().length() > 300){
                throw new AppException(ErrorCode.OTHER_REASON_LENGTH_INVALID);
            }
            orBR.setOtherCancelReason(request.getOtherReason());
        }
        if (type == StatusOfOrderDonation.REFUSED.getStatusCode()) {
            orBR.setStatus(StatusOfOrderDonation.REFUSED.getStatusCode());
        }
        if (type == StatusOfOrderDonation.CANCELED.getStatusCode()) {
            List<BloodBag> bloodBagList = bloodBagRepository.findByOrderBloodReceive(orBR);
            bloodBagList.forEach(bloodBag -> {
                bloodBag.setDelivered(false);
                bloodBag.setExisted(true);
                bloodBag.setOrderBloodReceive(null);
                bloodBagRepository.save(bloodBag);
            });
            orBR.setStatus(StatusOfOrderDonation.CANCELED.getStatusCode());
        }
        orBReceiveRepo.save(orBR);
    }
    public void acceptOrderReceive(LocalDate estimateDate, Long orderReceivingId) {
        OrderBloodReceive orBR = orBReceiveRepo.findById(orderReceivingId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        orBR.setEstimateDate(estimateDate);
        orBR.setStatus(StatusOfOrderDonation.PROCESSING.getStatusCode());
        orBReceiveRepo.save(orBR);
    }
    public void completeOrderReceive(Long orderReceivingId) {
        OrderBloodReceive orBR = orBReceiveRepo.findById(orderReceivingId)
                .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
        List<BloodBag> bloodBagList = bloodBagRepository.findByOrderBloodReceive(orBR);
        float totalAmount = 0f;
        for (BloodBag bloodBag : bloodBagList) {
            totalAmount += bloodBag.getVolumeMl();
            bloodBag.setDelivered(false);
            bloodBagRepository.save(bloodBag);
        }

        orBR.setDoneDate(LocalDate.now());
        orBR.setAmountBloodMl(totalAmount);
        orBR.setStatus(StatusOfOrderDonation.COMPLETED.getStatusCode());
        orBReceiveRepo.save(orBR);
    }

}
