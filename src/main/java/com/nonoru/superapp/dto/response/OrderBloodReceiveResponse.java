package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderBloodReceiveResponse {
    private long orderId;
    private String fullName;
    private int amountBloodMl;
    private String cccdNumber;
    private String phone;
    private String address;
    private String reason;
    private String type;
    private LocalDate createDate;
    private int status;
    private String bloodType;
    private String doneDate;
}