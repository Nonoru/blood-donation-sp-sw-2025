package com.nonoru.superapp.request;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterAccountRequest {
    private String username;
    private String password;
    private String passwordConfirm;
    private String email;
    private int roleId;
    @Override
    public String toString() {
        return "UserRegisterRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", passwordConfirm='" + passwordConfirm + '\'' +
                ", email='" + email + '\'' +
                ", roleId=" + roleId +
                '}';
    }
}
