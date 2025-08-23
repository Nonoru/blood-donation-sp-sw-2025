package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class OrderBloodDonationResponse {
    private long orderDonationId;

    private String fullName;
    private String phone;
    private String bloodType;

    private float amountBloodMl;

    private LocalDate orderDate;
    private LocalTime orderTime;
    private String createDate;

    private String createByUsername;

    private String dob;
    private String gender;
    private String cccdNumber;
    private String address;

    private Integer statusCode;
}
