package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.OrderDateDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public interface OrderDateDonationRepository extends JpaRepository<OrderDateDonation, Long> {

    @Query(value = """
    SELECT COUNT(*) 
    FROM  order_date_donation 
    WHERE order_date = :orderDate AND order_time = CAST(:orderTime AS time)
    """, nativeQuery = true)
    Integer existsByOrderDateAndOrderTime(
            @Param("orderDate") LocalDate orderDate,
            @Param("orderTime") LocalTime orderTime
    );

    @Query(value = """
    SELECT COUNT(o.[order-date-id]) 
    FROM order_date_donation od
    LEFT JOIN order_blood_donation o ON od.order_date_id = o.[order-date-id]
    WHERE od.order_date = :orderDate AND od.order_time = CAST(:orderTime AS time) AND o.status = 2
    GROUP BY od.order_date, od.order_time
    """, nativeQuery = true)
    Integer countOrderByOrderDateAndTime(
            @Param("orderDate") LocalDate orderDate,
            @Param("orderTime") LocalTime orderTime
    );

}
