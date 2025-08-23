package com.nonoru.superapp.repository;

import com.nonoru.superapp.entity.CancellationReason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CancellationReasonRepository extends JpaRepository<CancellationReason, Long> {
}
