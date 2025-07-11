package com.nonoru.superapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ForgotPasswordEmailRequest {
    @NotBlank(message = "EMAIL_EMPTY")
    @Pattern(regexp = "^[a-zA-Z0-9._-]+@gmail\\.com$", message = "EMAIL_INVALID")
    private String email;
    private String otp;
}
