package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserTokenDTO;
import com.nonoru.superapp.dto.response.UserOrderDonationResponse;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.OrderBloodDonationRepository;
import com.nonoru.superapp.repository.OrderDateDonationRepository;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderDateDonationRepository orDateRpo;
    @Autowired
    private OrderBloodDonationRepository orBlDonateRepo;
    public UserTokenDTO getUserDetail(String username) {
        UserAccount userAccount = userRepository.findByUsername(username);
        return UserTokenDTO.builder()
                .username(userAccount.getUsername())
                .role(userAccount.getRole().getRoleName())
                .build();
    }
    public boolean hasId(long id){
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long idJwt = jwt.getClaim("id");
        return idJwt == id;
    }

    //    @PostAuthorize("returnObject.username == authentication.name")
    public List<UserOrderDonationResponse> getOrderDonationOnlySelf(long id){

        if(!hasId(id)){
            throw new AppException(ErrorCode.AUTHENTICATION_ORDER_ERROR);
        }

        List<OrderBloodDonation> orders = orBlDonateRepo.findAllByUserAccount_Id(id);
        System.out.println(orders.size());
        List<UserOrderDonationResponse> responses = new ArrayList<>();
        orders.forEach(order -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String createDate = order.getCreateDate().format(formatter);
            String donationDate = order.getOrderDate().getOrderDate().format(formatter);
            UserOrderDonationResponse response = UserOrderDonationResponse.builder()
                    .orderDonationId(order.getOrderDonationId())
                    .fullName(order.getFullName())
                    .createDate(createDate)
                    .bloodType(order.getBlood().getBloodType())
                    .amountBloodMl(order.getAmountBloodMl())
                    .donateDate(donationDate)
                    .clinicName(order.getOrderDate().getClinic().getClinicName())
                    .statusCode(order.getStatus())
                    .reason(order.getReason())
                    .build();

            responses.add(response);
        });
        System.out.println(responses.size());
        return responses;
    }
}
