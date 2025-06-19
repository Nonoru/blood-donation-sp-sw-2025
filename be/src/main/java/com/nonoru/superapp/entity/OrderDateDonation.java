package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@ToString
public class OrderDateDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderDateId;

    private LocalDate orderDate;

    private LocalTime orderTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic-id")
    private Clinic clinic;
}
