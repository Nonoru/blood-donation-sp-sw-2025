package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.OrderDateDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDateDonationRepository extends JpaRepository<OrderDateDonation, Long> {
}
