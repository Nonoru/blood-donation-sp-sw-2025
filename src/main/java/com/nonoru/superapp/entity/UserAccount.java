package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 12)
    private String username;

    @Column(nullable = false, length = 60)
    private String hashPassword;

    @Column(unique = true, nullable = false, length = 60)
    private String email;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "roleId")
    private RoleAccount roleId;

    public UserAccount(String username, String hashPassword, String email, RoleAccount roleId) {
        this.username = username;
        this.hashPassword = hashPassword;
        this.email = email;
        this.roleId = roleId;
    }
}
