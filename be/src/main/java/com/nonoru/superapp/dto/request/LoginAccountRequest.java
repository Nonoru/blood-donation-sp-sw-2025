package com.nonoru.superapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginAccountRequest {
    private String tk;
    private String password;

    @Override
    public String toString() {
        return "LoginAccountRequest{" +
                "tk='" + tk + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
