package com.nonoru.superapp.repository;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.entity.BloodType;
import com.nonoru.superapp.entity.OrderBloodDonation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderBloodDonationRepository extends JpaRepository<OrderBloodDonation, Long>
{
    List<OrderBloodDonation> findByUserAccount_Id(Long userAccountId);
    
    // Thống kê đơn hiến máu trong 30 ngày gần nhất
    @Query("SELECT COUNT(o) FROM OrderBloodDonation o WHERE o.createDate >= :startDate")
    int countOrdersInLast30Days(@Param("startDate") java.time.LocalDate startDate);
    
    // Đếm đơn thành công (status = 3) trong 30 ngày
    @Query("SELECT COUNT(o) FROM OrderBloodDonation o WHERE o.status = 3 AND o.createDate >= :startDate")
    int countSuccessfulOrdersInLast30Days(@Param("startDate") java.time.LocalDate startDate);
    
    // Đếm đơn từ chối (status = 4,5) trong 30 ngày
    @Query("SELECT COUNT(o) FROM OrderBloodDonation o WHERE (o.status = 4 OR o.status = 5) AND o.createDate >= :startDate")
    int countRejectedOrdersInLast30Days(@Param("startDate") java.time.LocalDate startDate);
    
    // Lấy danh sách đơn từ chối với lý do trong 30 ngày
    @Query("SELECT o FROM OrderBloodDonation o WHERE (o.status = 4 OR o.status = 5) AND o.createDate >= :startDate")
    List<OrderBloodDonation> findRejectedOrdersInLast30Days(@Param("startDate") java.time.LocalDate startDate);
//    @Query(value = """
//    SELECT SUM(o.amountBloodMl) FROM OrderBloodDonation o WHERE o.status = :status AND o.orderDate.orderDateId IN(:listIdDate)
//    """)
//    Optional<Float> sumBloodAmountByStatus(@Param("status") int status, @Param("listIdDate") List<Long> listIdDate);
//
//    @Query(value = """
//    SELECT COUNT(o) FROM OrderBloodDonation o WHERE o.orderDate.orderDateId IN(:listIdDate)
//    """)
//    Integer countAllColumnOrderByStatus(@Param("listIdDate") List<Long> listIdDate);
//
//    @Query(value = """
//    SELECT COUNT(o) FROM OrderBloodDonation o WHERE (o.status = :status1 OR o.status = :status2)
//         AND o.orderDate.orderDateId IN(:listIdDate)
//    """)
//    Integer countColumnOrderByStatus(@Param("status1") int status1, @Param("status2") int status2, @Param("listIdDate") List<Long> listIdDate);
//
//    List<OrderBloodDonation> findAllByUserAccount_Id(Long userAccountId);
//
//    @Query(value = """
//    SELECT new com.nonoru.superapp.dto.BloodStorageChangeDTO(o.createDate, o.userAccount.username ,
//        'Donate' as type, o.amountBloodMl) FROM OrderBloodDonation o WHERE o.status = 3 AND o.blood = :blood
//    """)
//    List<BloodStorageChangeDTO> getOrderBloodDonations(@Param("blood") BloodType blood);
//
//    /* FOR BLOOD STATISTIC */
//    @Query(value = """
//    SELECT SUM(o.amountBloodMl) FROM OrderBloodDonation o WHERE o.status = 3 AND o.blood = :blood
//    """)
//    Optional<Float> getTotalBloodAmountByBlood(@Param("blood") BloodType blood);
}
