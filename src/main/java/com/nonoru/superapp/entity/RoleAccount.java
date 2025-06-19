package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoleAccount {
    @Id
    private int roleId;

    @Column(nullable = false, length = 12)
    private String roleName;
}
