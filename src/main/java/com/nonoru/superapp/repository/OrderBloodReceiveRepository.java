package com.nonoru.superapp.repository;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.entity.BloodStorage;
import com.nonoru.superapp.entity.OrderBloodReceive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderBloodReceiveRepository extends JpaRepository<OrderBloodReceive, Long> {
    List<OrderBloodReceive> findAllByUserAccount_Id(Long userAccountId);

    @Query(value = """
    SELECT new com.nonoru.superapp.dto.BloodStorageChangeDTO(o.createDate, o.userAccount.username ,
        'Receive' as type, o.amountBloodMl) FROM OrderBloodReceive o WHERE o.status = 3 AND o.blood = :blood
    """)
    List<BloodStorageChangeDTO> getOrderBloodReceive(@Param("blood") BloodStorage blood);
}
