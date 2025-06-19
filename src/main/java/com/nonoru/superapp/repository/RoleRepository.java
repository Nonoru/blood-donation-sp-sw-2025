package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.RoleAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleAccount, Integer> {
}
