package com.nonoru.superapp.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nonoru.superapp.entity.RoleAccount;
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

    private int roleId;

}
