package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderBloodReceiveRequest {
    @NotBlank(message = "FULL_NAME_EMPTY")
    private String fullName;

    private int amountBloodMl;

    @NotBlank(message = "CCCD_NUMBER_EMPTY")
    @Pattern(regexp = "0\\d{9,12}", message = "CCCD_NUMBER_INVALID")
    private String cccdNumber;

    @NotBlank(message = "PHONE_EMPTY")
    @Pattern(regexp = "0\\d{9,12}", message = "PHONE_INVALID")
    private String phone;

    @NotBlank(message = "ADDRESS_EMPTY")
    private String address;

    @NotBlank(message = "STATUS_OF_RECEIVING_ORDER_EMPTY")
    private String statusType;

    private int bloodId;

    private String reason;
}
