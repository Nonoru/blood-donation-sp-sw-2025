package com.nonoru.superapp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterError {
    private String existEmail;
    private String existUsername;
    private String errorConfirmPassword;
}
