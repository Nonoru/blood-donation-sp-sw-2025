package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderBloodReceiveResponse {
    private long orderReceivingId;
    private String fullName;
    private float amountBloodMl;
    private String cccdNumber;
    private String phone;
    private String address;
    private String userReason;
    private String type;
    private LocalDate createDate;
    private LocalDate estimateDate;
    private LocalDate doneDate;
    private String cancelReason;
    private String bloodType;

    private int status;
    private String createdByUsername;

//    FOR PROCESSING RECEIVE
    private List<BloodBagResponse> bloodBagResponses;

}