package com.nonoru.superapp.repository;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.entity.BloodType;
import com.nonoru.superapp.entity.OrderBloodReceive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderBloodReceiveRepository extends JpaRepository<OrderBloodReceive, Long> {
    List<OrderBloodReceive> findAllByUserAccount_Id(Long userAccountId);

    @Query(value = """
    SELECT new com.nonoru.superapp.dto.BloodStorageChangeDTO(o.createDate, o.userAccount.username ,
        'Receive' as type, o.amountBloodMl) FROM OrderBloodReceive o WHERE o.status = 3 AND o.blood = :blood
    """)
    List<BloodStorageChangeDTO> getOrderBloodReceive(@Param("blood") BloodType blood);

//    ==============

    /*SUM*/
    @Query(value = """
    SELECT SUM(o.amountBloodMl) FROM OrderBloodReceive o WHERE o.status = :status AND o.doneDate = :date
    """)
    Optional<Float> sumBloodAmountByStatus(@Param("status") int status, @Param("date") LocalDate date);

    @Query(value = """
    SELECT SUM(o.amountBloodMl) FROM OrderBloodReceive o WHERE o.status = :status AND o.doneDate BETWEEN :fDate AND :eDate
    """)
    Optional<Float> sumBloodAmountByStatusInMonth(@Param("status") int status, @Param("fDate") LocalDate fDate, @Param("eDate") LocalDate eDate);

    /*COUNT ALL*/
    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodReceive o WHERE o.createDate = :date
    """)
    Integer countAllColumnOrderByStatus(@Param("date") LocalDate createDate);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodReceive o WHERE o.createDate BETWEEN :fDate AND :eDate
    """)
    Integer countAllColumnOrderByStatusInMonth( @Param("fDate") LocalDate fDate, @Param("eDate") LocalDate eDate);

    /*COUNT BY STATUS*/
    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodReceive o WHERE (o.status = :status1 OR o.status = :status2)
         AND o.createDate = :date
    """)
    Integer countColumnOrderByStatus(@Param("date") LocalDate date, @Param("status1") int status1, @Param("status2") int status2);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodReceive o WHERE (o.status = :status1 OR o.status = :status2)
         AND o.createDate BETWEEN :fDate AND :eDate
    """)
    Integer countColumnOrderByStatusInMonth( @Param("fDate") LocalDate fDate, @Param("eDate") LocalDate eDate, @Param("status1") int status1, @Param("status2") int status2);

    /*COUNT COMPLETED*/
    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodReceive o WHERE o.status = 3
         AND o.doneDate = :date
    """)
    Integer countColumnOrderCompleted(@Param("date") LocalDate date);

    @Query(value = """
    SELECT COUNT(o) FROM OrderBloodReceive o WHERE o.status = 3
         AND o.doneDate BETWEEN :fDate AND :eDate
    """)
    Integer countColumnOrderCompletedInMonth( @Param("fDate") LocalDate fDate, @Param("eDate") LocalDate eDate);

    /*BLOOD STATISTIC*/
    @Query(value = """
    SELECT SUM(o.amountBloodMl) FROM OrderBloodReceive o WHERE o.status = 3 AND o.blood = :blood
    """)
    Optional<Float> getTotalBloodAmountByBlood(@Param("blood") BloodType blood);

    List<OrderBloodReceive> findAllByStatus(int status);

    List<OrderBloodReceive> findAllByType(String type);

    List<OrderBloodReceive> findAllByTypeAndStatusAndCancellationReason_CancellationReasonId(String type, int status, long cancellationReasonCancellationReasonId);
}
