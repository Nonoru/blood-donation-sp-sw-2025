package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.dto.response.BloodOrderStaticResponse;
import com.nonoru.superapp.dto.response.BloodStorageResponse;
import com.nonoru.superapp.entity.BloodStorage;
import com.nonoru.superapp.entity.OrderBloodDonation;
import com.nonoru.superapp.entity.OrderBloodReceive;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.repository.BloodStorageRepository;
import com.nonoru.superapp.repository.OrderBloodDonationRepository;
import com.nonoru.superapp.repository.OrderBloodReceiveRepository;
import com.nonoru.superapp.repository.OrderDateDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BloodService {
    @Autowired
    private BloodStorageRepository bloodRepo;
    @Autowired
    private OrderBloodDonationRepository orderDonationRepo;
    @Autowired
    private OrderBloodReceiveRepository orderReceiveRepo;
    @Autowired
    private OrderDateDonationRepository orderDateRepo;

    public List<BloodStorageResponse<BloodStorageChangeDTO>> getAllBloodStorage() {
        List<BloodStorageResponse<BloodStorageChangeDTO>> responses = new ArrayList<>();
        List<BloodStorage> bloodStorageList = bloodRepo.findAll();
        bloodStorageList.forEach(bloodStorage -> {
            List<BloodStorageChangeDTO> orderDonate = orderDonationRepo.getOrderBloodDonations(bloodStorage);
            List<BloodStorageChangeDTO> orderReceive = orderReceiveRepo.getOrderBloodReceive(bloodStorage);
            List<BloodStorageChangeDTO> allChange = Stream
                    .concat(orderDonate.stream(), orderReceive.stream())
                    .collect(Collectors.toList());
            BloodStorageResponse<BloodStorageChangeDTO> response = BloodStorageResponse.<BloodStorageChangeDTO>builder()
                    .id(bloodStorage.getId())
                    .bloodType(bloodStorage.getBloodType())
                    .amount(bloodStorage.getStorage())
                    .change(allChange)
                    .build();
            responses.add(response);
        });
        return responses;
    }

    /* STATISTIC ORDER */
    public BloodOrderStaticResponse getBloodStaticToday() {

        int processingCode = StatusOfOrderDonation.PROCESSING.getStatusCode();
        int confirmedCode = StatusOfOrderDonation.COMFRIMMED.getStatusCode();
        int completedCode = StatusOfOrderDonation.COMPLETED.getStatusCode();
        int refusedCode = StatusOfOrderDonation.REFUSED.getStatusCode();
        int canceledCode = StatusOfOrderDonation.CANCELED.getStatusCode();

        LocalDate today = LocalDate.now();
        List<Long> listIdDate = orderDateRepo.findListIdByDate(today);

        BloodOrderStaticResponse response = BloodOrderStaticResponse.builder()
                .countAllOrderDonation
                        (orderDonationRepo.countAllColumnOrderByStatus(listIdDate))
                .countAllOrderDonationWaiting
                        (orderDonationRepo.countColumnOrderByStatus(processingCode ,confirmedCode , listIdDate))
                .countAllOrderDonationCompleted
                        (orderDonationRepo.countColumnOrderByStatus(completedCode, completedCode, listIdDate))
                .countAllOrderDonationDenied
                        (orderDonationRepo.countColumnOrderByStatus(refusedCode, canceledCode, listIdDate))
                .donationBloodAmount
                        (orderDonationRepo.sumBloodAmountByStatus(completedCode, listIdDate))
                .build();
        return response;
    }
}
