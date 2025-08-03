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
public class OrderBloodReceive {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderReceivingId;

    @Column(nullable = false, columnDefinition = "NVARCHAR(50)")
    private String fullName;

    private float amountBloodMl;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String cccdNumber;

    @Column(nullable = false, columnDefinition = "VARCHAR(60)")
    private String phone;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String address;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String userReason;

    @Column(nullable = false, columnDefinition = "VARCHAR(10)")
    private String type;

    private LocalDate createDate;
    private LocalDate estimateDate;

    @Column(nullable = true)
    private LocalDate doneDate;

    private int status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cancellation_reason")
    private CancellationReason cancellationReason;

    @Column(nullable = true, columnDefinition = "NVARCHAR(300)")
    private String otherCancelReason;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "blood_id")
    private BloodType blood;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "create_by")
    private UserAccount userAccount;

    @Builder
    public OrderBloodReceive(String fullName, int amountBloodMl, String cccdNumber, String phone, String address, String userReason, String type, LocalDate createDate, LocalDate estimateDate, LocalDate doneDate, int status, CancellationReason cancellationReason, String otherCancelReason, BloodType blood, UserAccount userAccount) {
        this.fullName = fullName;
        this.amountBloodMl = amountBloodMl;
        this.cccdNumber = cccdNumber;
        this.phone = phone;
        this.address = address;
        this.userReason = userReason;
        this.type = type;
        this.createDate = createDate;
        this.estimateDate = estimateDate;
        this.doneDate = doneDate;
        this.status = status;
        this.cancellationReason = cancellationReason;
        this.otherCancelReason = otherCancelReason;
        this.blood = blood;
        this.userAccount = userAccount;
    }
}
