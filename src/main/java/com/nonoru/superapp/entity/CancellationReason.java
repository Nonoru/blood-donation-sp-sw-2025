package com.nonoru.superapp.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class CancellationReason {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cancellationReasonId;

    @Column(nullable = false, columnDefinition = "NVARCHAR(300)")
    private String cancellationReasonName;

    @Column(nullable = false, columnDefinition = "NVARCHAR(50)")
    private String cancellationReasonType;
}
