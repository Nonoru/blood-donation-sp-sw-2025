package com.nonoru.superapp.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
public class GetAllAccountResponse {
    private Long id;
    private String username;
    private String email;
    private int roleId;
    private String roleName;
}

