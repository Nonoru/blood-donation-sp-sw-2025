package com.nonoru.superapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginAccountRequest {
    private String username;
    private String password;
    private String email;
}
