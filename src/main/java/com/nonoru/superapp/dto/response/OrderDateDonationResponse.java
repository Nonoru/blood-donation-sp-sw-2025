package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nonoru.superapp.dto.ClinicDTO;
import com.nonoru.superapp.entity.Clinic;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ToString
public class OrderDateDonationResponse {
    private long orderDateId;
    private String orderDate;
    private LocalTime orderTime;
    private String clinicName;
    private int numberOfPeople;
    @Builder
    public OrderDateDonationResponse(long orderDateId, String orderDate, LocalTime orderTime, int numberOfPeople, String clinicName) {
        this.orderDateId = orderDateId;
        this.orderDate = orderDate;
        this.orderTime = orderTime;
        this.numberOfPeople = numberOfPeople;
        this.clinicName = clinicName;
    }
}
