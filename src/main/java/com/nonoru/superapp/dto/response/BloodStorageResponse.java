package com.nonoru.superapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodStorageResponse<T> {
    private int id;
    private String bloodType;
    private float amount;
    private List<T> change;
}
