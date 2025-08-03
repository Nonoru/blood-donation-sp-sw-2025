package com.nonoru.superapp.service;

import com.nonoru.superapp.entity.CancellationReason;
import com.nonoru.superapp.repository.CancellationReasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CancellationReasonService {
    @Autowired
    private CancellationReasonRepository reasonRepo;

    public List<CancellationReason> findAll() {
        return reasonRepo.findAll();
    }
}
