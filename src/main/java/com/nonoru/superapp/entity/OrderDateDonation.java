package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@ToString
public class OrderDateDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDateId;

    private LocalDate orderDate;

    @Column(columnDefinition = "time")
    private LocalTime orderTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic-id")
    private Clinic clinic;

    @Builder
    public OrderDateDonation(LocalDate orderDate, LocalTime orderTime, Clinic clinic) {
        this.orderDate = orderDate;
        this.orderTime = orderTime;
        this.clinic = clinic;
    }
}
