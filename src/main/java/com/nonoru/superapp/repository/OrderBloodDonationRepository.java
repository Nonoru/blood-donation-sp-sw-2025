package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.OrderBloodDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderBloodDonationRepository extends JpaRepository<OrderBloodDonation, Long> {
}
