package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserTokenDTO;
import com.nonoru.superapp.dto.response.OrderReceiveUrgentPublicResponse;
import com.nonoru.superapp.dto.response.UserOrderDonationResponse;
import com.nonoru.superapp.entity.*;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private OrderBloodDonationRepository orBlDonateRepo;
    @Autowired
    private OrderBloodReceiveRepository orBlReceiveRepo;

    public List<UserOrderDonationResponse> getOrderDonationOnlySelf(){
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idJwt = jwt.getClaim("id");
        List<OrderBloodDonation> orders = orBlDonateRepo.findByUserAccount_Id((idJwt));
        List<UserOrderDonationResponse> responses = new ArrayList<>();

        orders.forEach(order -> {

//            OTHER REASON ====
            CancellationReason cancelReason = order.getCancelReason();
            String reason = null;

            if(cancelReason != null) {
                if (cancelReason.getCancellationReasonId() == 1)
                    reason = order.getOtherReason();
                else{
                    reason = cancelReason.getCancellationReasonName();
                }
            }
//            BLOOD TYPE ====
            String bloodTypeStr = null;
            BloodType bloodType = order.getBlood();
            if(bloodType != null) {
                bloodTypeStr = bloodType.getBloodType();
            }


            UserOrderDonationResponse response = UserOrderDonationResponse.builder()
                    .orderDonationId(order.getOrderDonationId())
                    .fullName(order.getFullName())
                    .createDate(order.getCreateDate())

                    .appointmentDate(order.getOrderDate().getOrderDate())
                    .appointmentTime(order.getOrderDate().getOrderTime())
                    .clinicName(order.getOrderDate().getClinic().getClinicName())

                    .bloodType(bloodTypeStr)
                    .donationAmount(order.getAmountBloodDonation())

                    .statusCode(order.getStatus())
                    .reason(reason)
                    .build();

            responses.add(response);
        });
        return responses;
    }
    public List<OrderReceiveUrgentPublicResponse> getOrderReceiveUrgentPublic(){
        List<OrderBloodReceive> listOrderReceive = orBlReceiveRepo.findAllByTypeAndStatusAndCancellationReason_CancellationReasonId("urgent",4,14);
        List<OrderReceiveUrgentPublicResponse> responses = new ArrayList<>();
        listOrderReceive.forEach(orderReceive -> {
            OrderReceiveUrgentPublicResponse response = OrderReceiveUrgentPublicResponse.builder()
                    .fullName(orderReceive.getFullName())
                    .phoneNumber(orderReceive.getPhone())
                    .amountMl(orderReceive.getAmountBloodMl())
                    .bloodType(orderReceive.getBlood().getBloodType())
                    .build();
            responses.add(response);
        });
        return responses;
    }
}
