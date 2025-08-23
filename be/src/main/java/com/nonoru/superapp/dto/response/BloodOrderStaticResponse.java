package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class BloodOrderStaticResponse {
    private int countAllOrderDonation;
    private int countAllOrderDonationWaiting;
    private int countAllOrderDonationCompleted;
    private int countAllOrderDonationDenied;
    private float donationBloodAmount;

    private int countAllOrderReceive;
    private int countAllOrderReceiveWaiting;
    private int countAllOrderReceiveCompleted;
    private int countAllOrderReceiveDenied;
    private float receiveBloodAmount;

}
