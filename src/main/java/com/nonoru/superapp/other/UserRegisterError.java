package com.nonoru.superapp.other;

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
    private String usernameLengthInvalid;
    private String passwordLengthInvalid;
    private String usernameInvalid;
    private String passwordInvalid;
}
