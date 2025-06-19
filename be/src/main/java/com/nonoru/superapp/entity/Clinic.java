package com.nonoru.superapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Clinic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String clinicName;
}
