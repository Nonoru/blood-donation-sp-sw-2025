package com.nonoru.superapp.repository;

import com.nonoru.superapp.response.GetAllAccountResponse;
import com.nonoru.superapp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccMngRepository extends JpaRepository<UserAccount, Long> {

    @Query("SELECT new com.nonoru.superapp.response.GetAllAccountResponse" +
            "(u.id, u.username, u.email, r.roleId, r.roleName) " +
            "FROM UserAccount u JOIN u.role r")
    List<GetAllAccountResponse> getAllUsersWithRole();
}
