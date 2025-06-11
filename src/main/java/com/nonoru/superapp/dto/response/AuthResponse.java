package com.nonoru.superapp.dto.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse<T> {
    private String token;
    private boolean authenticated;
    private T data;
}
