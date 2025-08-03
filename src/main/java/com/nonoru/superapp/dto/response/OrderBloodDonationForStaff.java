package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
@Builder
public class OrderBloodDonationForStaff {
    private long orderDonationId;
    private String fullName;
    private String cccdNumber;
    private String phone;
    private String bloodType;
    private LocalDate orderDate;
    private LocalTime orderTime;
    private LocalDate createDate;
    private String cancelReason;
    private int status;
    private float amountBloodDonation = 0.0f;
}
