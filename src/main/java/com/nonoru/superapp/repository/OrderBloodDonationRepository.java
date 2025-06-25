package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface OrderBloodDonationRepository extends JpaRepository<OrderBloodDonation, Long>
{
    @Query(value = """
    SELECT SUM(o.amountBloodMl) FROM OrderBloodDonation o WHERE o.status = :status AND o.orderDate.orderDateId IN(:listIdDate)
    """)
    Float sumBloodAmountByStatus(@Param("status") int status, @Param("listIdDate") List<Long> listIdDate);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodDonation o WHERE o.orderDate.orderDateId IN(:listIdDate)
    """)
    Integer countAllColumnOrderByStatus(@Param("listIdDate") List<Long> listIdDate);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodDonation o WHERE (o.status = :status1 OR o.status = :status2)
         AND o.orderDate.orderDateId IN(:listIdDate)
    """)
    Integer countColumnOrderByStatus(@Param("status1") int status1, @Param("status2") int status2, @Param("listIdDate") List<Long> listIdDate);

    List<OrderBloodDonation> findAllByUserAccount(UserAccount userAccount);
}
