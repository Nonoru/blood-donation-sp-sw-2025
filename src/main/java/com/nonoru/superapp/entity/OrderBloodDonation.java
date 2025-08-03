package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@ToString
public class OrderBloodDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderDonationId;

    @Column(nullable = false, columnDefinition = "NVARCHAR(60)")
    private String fullName;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false, columnDefinition = "NVARCHAR(5)")
    private String gender;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String cccdNumber;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String phone;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood-id")
    private BloodType blood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order-date-id")
    private OrderDateDonation orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create-by")
    private UserAccount userAccount;

    private int status;

    private LocalDate createDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancle-reason")
    private CancellationReason cancelReason;

    private String otherReason;

    private float amountBloodDonation;

    @Builder

    public OrderBloodDonation(String fullName, LocalDate dob, String gender, String cccdNumber, String phone,
            String address, BloodType blood, OrderDateDonation orderDate, UserAccount userAccount, int status,
            CancellationReason cancelReason, String otherReason, float amountBloodDonation) {
        this.fullName = fullName;
        this.dob = dob;
        this.gender = gender;
        this.cccdNumber = cccdNumber;
        this.phone = phone;
        this.address = address;
        this.blood = blood;
        this.orderDate = orderDate;
        this.userAccount = userAccount;
        this.status = status;
        this.createDate = LocalDate.now();
        this.cancelReason = cancelReason;
        this.otherReason = otherReason ;
        this.amountBloodDonation = amountBloodDonation;
    }
}
