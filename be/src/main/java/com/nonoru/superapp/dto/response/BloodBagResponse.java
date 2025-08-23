package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class BloodBagResponse {
    private Long bloodBagId;
    private float volumeMl;
    private String bloodType;
    private String donateByDonorName;
    private LocalDateTime collectionDate;
    private LocalDateTime expiryDate;
    private int status;
}
