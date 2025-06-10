package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterAccountRequest {
    @Size(min = 6, max = 12, message = "USER_LENGTH_INVALID")
    private String username;

    @Size(min = 6, max = 12, message = "Ahuhu")
    @NotBlank(message = "")
    private String password;

    @Size(min = 6, max = 12, message = "Ahuhu")
    @NotBlank(message = "")
    private String passwordConfirm;


    private String fullName;

    private String email;
}
