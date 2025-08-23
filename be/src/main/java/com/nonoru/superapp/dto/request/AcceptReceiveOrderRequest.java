package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcceptReceiveOrderRequest {
    private Long orderReceivingId;

    @FutureOrPresent(message = "ORDER_RECEIVE_ESTIMATE_DATE")
    private LocalDate estimateDate;

    private List<Long> bloodBagIds;
}
