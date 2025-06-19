package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.BloodStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BloodStorageRepository extends JpaRepository<BloodStorage, Integer> {
}
