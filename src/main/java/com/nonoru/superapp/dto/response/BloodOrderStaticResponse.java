package com.nonoru.superapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodOrderStaticResponse {
    private int countAllOrderDonation;
    private int countAllOrderDonationWaiting;
    private int countAllOrderDonationCompleted;
    private int countAllOrderDonationDenied;

    private float donationBloodAmount;

//    private int countOrderReceive;
//    private float receiveBloodAmount;

}
