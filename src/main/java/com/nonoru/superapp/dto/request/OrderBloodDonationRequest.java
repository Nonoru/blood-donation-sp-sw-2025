package com.nonoru.superapp.dto.request;

import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderBloodDonationRequest {
    @NotBlank(message = "FULL_NAME_EMPTY")
    private String fullName;

    @NotNull(message = "DOB_EMPTY")
    @Past(message = "DOB_MUST_IN_PAST")
    private LocalDate dob;

    private int amountBloodMl;

    private int gender;

    private float weight;

    @NotBlank(message = "CCCD_NUMBER_EMPTY")
    @Pattern(regexp = "0\\d{9,12}", message = "CCCD_NUMBER_INVALID")
    private String cccdNumber;

    @NotBlank(message = "PHONE_EMPTY")
    @Pattern(regexp = "0\\d{9,12}", message = "PHONE_INVALID")
    private String phone;

    @NotBlank(message = "ADDRESS_EMPTY")
    private String address;

    private int bloodId;
    private long orderDateId;
    private long userId;

}
