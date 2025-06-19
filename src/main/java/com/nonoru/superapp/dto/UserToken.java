package com.nonoru.superapp.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserToken {
    private String username;
    private String role;
}
