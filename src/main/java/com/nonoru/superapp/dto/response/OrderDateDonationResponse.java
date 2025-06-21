package com.nonoru.superapp.dto.response;

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
public class OrderDateDonationResponse {
    private long orderDateId;
    private LocalDate orderDate;
    private LocalTime orderTime;
    private int numberOfPeople;
}
