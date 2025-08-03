package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AcceptDonationOrderRequest {
    private Long orderDonationId;

    @Min(value = 250, message = "VOLUME_BELLOW_MIN_VALUE")
    @Max(value = 650, message = "VOLUME_HIGHER_MIN_VALUE")
    private float volumeMl;

    private Long bloodType;

    @FutureOrPresent(message = "BLOOD_BAG_EXPIRY_DATE")
    private LocalDateTime expiryDate;
}
