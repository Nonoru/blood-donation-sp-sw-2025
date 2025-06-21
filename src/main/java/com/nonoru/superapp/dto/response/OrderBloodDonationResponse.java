package com.nonoru.superapp.dto.response;

import com.nonoru.superapp.entity.OrderDateDonation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderBloodDonationResponse {
    private long orderDonationId;
    private String fullName;
    private String phone;
    private String bloodType;
    private float amountBloodMl;
    private String orderDate;
    private String createByUsername;

    private String dob;
    private String gender;
    private String createDate;
    private float weight;
    private String cccdNumber;
    private String address;
}
