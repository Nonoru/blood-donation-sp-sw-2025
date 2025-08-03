package com.nonoru.superapp.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ToString
public class OrderReceiveUrgentPublicResponse {
    private String fullName;
    private float amountMl;
    private String bloodType;
    private String phoneNumber;
}
