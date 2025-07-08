package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data

public class ChangePasswordRequest {
    @NotBlank(message = "PASSWORD_EMPTY")
    private String oldPassword;

    @Length(min = 6, max = 12, message = "PASSWORD_LENGTH_INVALID")
    @NotBlank(message = "PASSWORD_EMPTY")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|;':\",./<>?`~]+$", message = "PASSWORD_CONTAIN_ERROR_SYMBOL")
    private String newPassword;

    @NotBlank(message = "PASSWORD_CONFIRM_EMPTY")
    private String confirmNewPassword;
}
