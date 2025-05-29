package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserAccount, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

}
