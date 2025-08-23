package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.OtpPassword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface OtpPasswordRepository extends JpaRepository<OtpPassword, Long> {
    @Query(value = """
    SELECT o FROM OtpPassword o WHERE o.email = :email AND o.otpCode = :otp AND o.expiry > :now
    """)
    OtpPassword getOtpPassword(
            @Param("email") String email
            , @Param("otp") String otp
            , @Param("now") LocalDateTime now);
}
