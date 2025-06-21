package com.nonoru.superapp.entity;

import com.nonoru.superapp.enums.StatusOfOrderDonation;
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

    @Column(nullable = false, columnDefinition = "NVARCHAR(60)")
    private String address;

    @Column(nullable = false)
    private float amountBloodMl;

    @Column(nullable = false)
    private float weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood-id")
    private BloodStorage blood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order-date-id")
    private OrderDateDonation orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create-by")
    private UserAccount userAccount;

    private int status;

    private LocalDate createDate;

    @Builder

    public OrderBloodDonation(String fullName, LocalDate dob, String gender, String cccdNumber, String phone, String address, float amountBloodMl, float weight, BloodStorage blood, OrderDateDonation orderDateId, UserAccount userAccount, int status, LocalDate createDate) {
        this.fullName = fullName;
        this.dob = dob;
        this.gender = gender;
        this.cccdNumber = cccdNumber;
        this.phone = phone;
        this.address = address;
        this.amountBloodMl = amountBloodMl;
        this.weight = weight;
        this.blood = blood;
        this.orderDate = orderDateId;
        this.userAccount = userAccount;
        this.status = status;
        this.createDate = createDate;
    }
}
