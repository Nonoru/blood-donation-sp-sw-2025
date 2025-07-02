package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.OrderBloodReceive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderBloodReceiveRepository extends JpaRepository<OrderBloodReceive, Long> {
    List<OrderBloodReceive> findAllByUserAccount_Id(Long userAccountId);
}
