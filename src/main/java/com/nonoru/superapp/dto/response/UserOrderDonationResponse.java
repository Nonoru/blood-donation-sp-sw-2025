package com.nonoru.superapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserOrderDonationResponse {
    private long orderDonationId;
    private String createDate;
    private String bloodType;
    private float amountBloodMl;
    private String donateDate;
    private String clinicName;
    private int statusCode;
    private String reason;
}
