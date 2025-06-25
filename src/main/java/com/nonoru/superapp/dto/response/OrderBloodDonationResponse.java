package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderBloodDonationResponse {
    private long orderDonationId;
    private String fullName;
    private String phone;
    private String bloodType;
    private float amountBloodMl;
    private String orderDate;
    private LocalTime orderTime;
    private String createByUsername;

    private String dob;
    private String gender;
    private String createDate;
    private float weight;
    private String cccdNumber;
    private String address;

    private Integer statusCode;
}
