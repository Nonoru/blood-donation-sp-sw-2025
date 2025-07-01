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
public class OrderBloodReceiving {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderReceivingId;

    @Column(nullable = false, columnDefinition = "NVARCHAR(50)")
    private String fullName;

    private int amountBloodMl;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String cccdNumber;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String phone;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String address;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String reason;

    @Column(nullable = false, columnDefinition = "VARCHAR(10)")
    private String type;

    private LocalDate createDate;
    private LocalDate actualDoneDate;
    private int status;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String reasonCancel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_id")
    private BloodStorage blood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create_by")
    private UserAccount userAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic-room")
    private Clinic clinic;


    @Builder

    public OrderBloodReceiving(String fullName, int amountBloodMl, String cccdNumber, String phone, String address, String reason, String type, LocalDate createDate, LocalDate actualDoneDate, int status, String reasonCancel, BloodStorage blood, UserAccount userAccount, Clinic clinic) {
        this.fullName = fullName;
        this.amountBloodMl = amountBloodMl;
        this.cccdNumber = cccdNumber;
        this.phone = phone;
        this.address = address;
        this.reason = reason;
        this.type = type;
        this.createDate = createDate;
        this.actualDoneDate = actualDoneDate;
        this.status = status;
        this.reasonCancel = reasonCancel;
        this.blood = blood;
        this.userAccount = userAccount;
        this.clinic = clinic;
    }
}
