package com.nonoru.superapp.repository;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.entity.BloodStorage;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderBloodDonationRepository extends JpaRepository<OrderBloodDonation, Long>
{
    @Query(value = """
    SELECT SUM(o.amountBloodMl) FROM OrderBloodDonation o WHERE o.status = :status AND o.orderDate.orderDateId IN(:listIdDate)
    """)
    Optional<Float> sumBloodAmountByStatus(@Param("status") int status, @Param("listIdDate") List<Long> listIdDate);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodDonation o WHERE o.orderDate.orderDateId IN(:listIdDate)
    """)
    Integer countAllColumnOrderByStatus(@Param("listIdDate") List<Long> listIdDate);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodDonation o WHERE (o.status = :status1 OR o.status = :status2)
         AND o.orderDate.orderDateId IN(:listIdDate)
    """)
    Integer countColumnOrderByStatus(@Param("status1") int status1, @Param("status2") int status2, @Param("listIdDate") List<Long> listIdDate);

    List<OrderBloodDonation> findAllByUserAccount_Id(Long userAccountId);

    @Query(value = """
    SELECT new com.nonoru.superapp.dto.BloodStorageChangeDTO(o.createDate, o.userAccount.username ,
        'Donate' as type, o.amountBloodMl) FROM OrderBloodDonation o WHERE o.status = 3 AND o.blood = :blood
    """)
    List<BloodStorageChangeDTO> getOrderBloodDonations(@Param("blood") BloodStorage blood);

}
