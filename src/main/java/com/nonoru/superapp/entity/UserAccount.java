package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(12)")
    private String username;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)" )
    private String hashPassword;

    @Column(unique = true, nullable = false, columnDefinition = "VARCHAR(60)")
    private String email;

    @Column(nullable = false, columnDefinition = "NVARCHAR(60)")
    private String fullName;

    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "role")
    private RoleAccount role;

    @Column(nullable = false)
    private boolean status = true;

    @Builder
    public UserAccount(String fullName, String username, String hashPassword, String email, RoleAccount role, boolean status) {
        this.fullName = fullName;
        this.username = username;
        this.hashPassword = hashPassword;
        this.email = email;
        this.role = role;
        this.status = status;
    }
}
