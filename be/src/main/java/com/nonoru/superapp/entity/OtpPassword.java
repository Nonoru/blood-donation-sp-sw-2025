package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class OtpPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private LocalDateTime expiry;
    private String otpCode;
    @Builder
    public OtpPassword(String otpCode, LocalDateTime expiry, String email) {
        this.otpCode = otpCode;
        this.expiry = expiry;
        this.email = email;
    }
}
