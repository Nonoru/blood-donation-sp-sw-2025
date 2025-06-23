package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.response.BloodOrderStaticResponse;
import com.nonoru.superapp.repository.BloodStorageRepository;
import com.nonoru.superapp.repository.OrderBloodDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BloodService {
    @Autowired
    private BloodStorageRepository bloodRepo;
    @Autowired
    private OrderBloodDonationRepository orBlDRepo;

}
