package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.BloodBag;
import com.nonoru.superapp.entity.OrderBloodReceive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodBagRepository extends JpaRepository<BloodBag, Long> {
    List<BloodBag> findByOrderBloodReceive(OrderBloodReceive orderBloodReceive);
}
