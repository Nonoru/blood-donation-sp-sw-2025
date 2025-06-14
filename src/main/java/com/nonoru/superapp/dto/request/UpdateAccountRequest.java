package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UpdateAccountRequest {
    @NotBlank(message = "FULL_NAME_EMPTY")
    private String fullName;

    @NotBlank(message = "EMAIL_EMPTY")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "EMAIL_INVALID")
    private String email;

    @Length(min = 6, max = 12, message = "PASSWORD_LENGTH_INVALID")
    @NotBlank(message = "PASSWORD_EMPTY")
    @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|;':\",./<>?`~]+$", message = "PASSWORD_CONTAIN_ERROR_SYMBOL")
    private String password;

    @NotBlank(message = "PASSWORD_CONFIRM_EMPTY")
    private String passwordConfirm;
    
    private int roleId;

}
