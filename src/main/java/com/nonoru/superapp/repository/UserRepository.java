package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserAccount, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    UserAccount findByUsername(String username);
}
