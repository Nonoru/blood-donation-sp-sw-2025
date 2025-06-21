package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDateDonationRequest {

    @NotNull(message = "ORDER_DATE_EMPTY")
    @FutureOrPresent(message = "ORDER_DATE_MUST_IN_FUTURE")
    private LocalDate orderDate;

    @NotNull(message = "ORDER_TIME_EMPTY")
    @Future(message = "ORDER_TIME_MUST_IN_FUTURE")
    private LocalTime orderTime;

    private int clinicId;
}
