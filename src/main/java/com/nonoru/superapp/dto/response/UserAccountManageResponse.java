package com.nonoru.superapp.dto.response;

import com.nonoru.superapp.entity.RoleAccount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserAccountManageResponse {
    private long id;
    private String fullName;
    private String username;
    private String email;
    private String createAt;
    private RoleAccount role;
    private boolean status;
}
