package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageAccountRepository extends JpaRepository<UserAccount, Long> {

}
