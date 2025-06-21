package com.nonoru.superapp.service;

import com.nonoru.superapp.entity.Clinic;
import com.nonoru.superapp.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicService {
    @Autowired
    private ClinicRepository clinicRepo;
    public List<Clinic> getAllClinics() {
        return clinicRepo.findAll();
    }
}
