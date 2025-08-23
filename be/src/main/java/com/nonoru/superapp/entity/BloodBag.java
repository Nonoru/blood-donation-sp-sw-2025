package com.nonoru.superapp.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Data
@NoArgsConstructor
@ToString
public class BloodBag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bloodBagId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_type_id", nullable = false)
    private BloodType bloodType;

    @Column(nullable = false)
    private float volumeMl;

    @Column(nullable = false)
    private LocalDateTime collectionDate;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_blood_donation")
    private OrderBloodDonation orderBloodDonation;

    @Column(nullable = false)
    @ColumnDefault("0")
    private boolean isDelivered = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_blood_receive")
    private OrderBloodReceive orderBloodReceive;

    @Column(nullable = false)
    @ColumnDefault("1")
    private boolean isExisted;

    @Builder
    public BloodBag(BloodType bloodType, float volumeMl, LocalDateTime collectionDate,
                    LocalDateTime expiryDate, OrderBloodDonation orderBloodDonation) {
        this.bloodType = bloodType;
        this.volumeMl = volumeMl;
        this.collectionDate = collectionDate;
        this.expiryDate = expiryDate;
        this.orderBloodDonation = orderBloodDonation;
    }
}
