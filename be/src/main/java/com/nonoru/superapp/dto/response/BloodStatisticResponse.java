package com.nonoru.superapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BloodStatisticResponse {
    private int totalOrders;
    private int successfulOrders; // status = 3 (COMPLETED)
    private int rejectedOrders; // status = 4,5 (REFUSED, CANCELED)
    private Map<String, Integer> rejectionReasons; // Lý do từ chối và số lượng
    private String period; // "30 ngày gần nhất"
}
