package com.nonoru.superapp.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserRegisterRequest {
    private String username;
    private String password;
    private String email;
}
