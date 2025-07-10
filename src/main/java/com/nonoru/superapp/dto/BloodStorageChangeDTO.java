package com.nonoru.superapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class BloodStorageChangeDTO {
    private LocalDate date;
    private String createBy;
    private String type;
    private float amount;
}
