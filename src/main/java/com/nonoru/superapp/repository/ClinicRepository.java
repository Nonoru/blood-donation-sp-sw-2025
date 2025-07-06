package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClinicRepository extends JpaRepository<Clinic, Integer> {
    Optional<Clinic> findById(int id);
}
