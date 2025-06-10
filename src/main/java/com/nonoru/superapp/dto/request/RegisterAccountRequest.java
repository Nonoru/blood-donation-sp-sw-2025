package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterAccountRequest {
    @Length(min = 6, max = 12, message = "USER_LENGTH_INVALID")
    @NotBlank(message = "USER_EMPTY")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|;':\",./<>?`~]+$", message = "USER_CONTAIN_ERROR_SYMBOL")
    private String username;

    @Length(min = 6, max = 12, message = "PASSWORD_LENGTH_INVALID")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|;':\",./<>?`~]+$", message = "PASSWORD_CONTAIN_ERROR_SYMBOL")
    private String password;

    @NotBlank(message = "PASSWORD_CONFIRM_EMPTY")
    private String passwordConfirm;

    @NotBlank(message = "FULL_NAME_EMPTY")
    private String fullName;

    @Email(message = "EMAIL_INVALID")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "EMAIL_INVALID")
    @NotBlank(message = "EMAIL_BLANK_CONTAIN")
    private String email;
}
