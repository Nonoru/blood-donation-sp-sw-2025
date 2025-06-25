package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserTokenDTO;
import com.nonoru.superapp.dto.response.UserOrderDonationResponse;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.OrderBloodDonationRepository;
import com.nonoru.superapp.repository.OrderDateDonationRepository;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
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
    @PostAuthorize("returnObject.username == authentication.name")
    public List<UserOrderDonationResponse> getOrderDonationOnlySelf(long userId){
        List<OrderBloodDonation> orderOfUser = orBlDonateRepo.findAllByUserAccount(userRepository.findById(userId).get());
        List<UserOrderDonationResponse> responses = new ArrayList<>();
        orderOfUser.forEach(order -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String createDate = order.getCreateDate().format(formatter);
            String donationDate = order.getOrderDate().getOrderDate().format(formatter);
            UserOrderDonationResponse response = UserOrderDonationResponse.builder()
                    .orderDonationId(order.getOrderDonationId())
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
        return responses;
    }
}
