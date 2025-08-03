package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nonoru.superapp.entity.BloodType;
import com.nonoru.superapp.entity.CancellationReason;
import com.nonoru.superapp.entity.Clinic;
import com.nonoru.superapp.entity.OrderDateDonation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserOrderDonationResponse {
    private long orderDonationId;

    private String fullName;
    private LocalDate createDate;

    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String clinicName;

    private String bloodType;
    private float donationAmount;

    private int statusCode;

    private String reason;
}
