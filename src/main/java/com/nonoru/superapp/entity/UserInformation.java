//package com.nonoru.superapp.entity;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.Nationalized;
//
//@Entity
//@Data
//@NoArgsConstructor
//@Table(name = "user_information")
//public class UserInformation {
//    @Id
//    private long id;
//
//    @Column(nullable = false, length = 50)
//    @Nationalized
//    private String fullName;
//
//    @Column(nullable = false, length = 20)
//    private String phoneNumber;
//
//    private int yob;
//
//    @Column(length = 200)
//    @Nationalized
//    private String address;
//
//    private int bloodId;
//
//    private int roleId;
//
//    private int point;
//
//    @OneToOne
//    @MapsId
//    @JoinColumn(name = "id")
//    private UserAccount userAccount;
//
//    public UserInformation(String fullName, String phoneNumber, String address) {
//        this.fullName = fullName;
//        this.phoneNumber = phoneNumber;
//        this.address = address;
//    }
//
//}
