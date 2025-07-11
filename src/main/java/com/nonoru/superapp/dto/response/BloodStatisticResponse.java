package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BloodStatisticResponse {
    private int id;
    private String bloodType;
    private float storage;
    private float changeDonate;
    private float changeReceive;
}
