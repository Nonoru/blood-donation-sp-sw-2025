package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.BloodStorageChangeDTO;
import com.nonoru.superapp.dto.response.BloodOrderStaticResponse;
import com.nonoru.superapp.dto.response.BloodStorageResponse;
import com.nonoru.superapp.entity.BloodStorage;
import com.nonoru.superapp.enums.StatusOfOrderDonation;
import com.nonoru.superapp.repository.BloodStorageRepository;
import com.nonoru.superapp.repository.OrderBloodDonationRepository;
import com.nonoru.superapp.repository.OrderBloodReceiveRepository;
import com.nonoru.superapp.repository.OrderDateDonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
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

    private final int processingCode = StatusOfOrderDonation.PROCESSING.getStatusCode();
    private final int confirmedCode = StatusOfOrderDonation.COMFRIMMED.getStatusCode();
    private final int completedCode = StatusOfOrderDonation.COMPLETED.getStatusCode();
    private final int refusedCode = StatusOfOrderDonation.REFUSED.getStatusCode();
    private final int canceledCode = StatusOfOrderDonation.CANCELED.getStatusCode();
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
    public BloodOrderStaticResponse getBloodDonateStatic(int whatDay, boolean rightMonth) {
        LocalDate today = LocalDate.now().minusDays(whatDay);
        List<Long> listIdDate = new ArrayList<>();
        Float ammountBlood = 0.0f;
        if(!rightMonth) {
            listIdDate = orderDateRepo.findListIdByDate(today);
            ammountBlood = orderDonationRepo.sumBloodAmountByStatus(completedCode, listIdDate).orElse(0.0f);
        }else {
            int month = today.getMonthValue();
            int year = today.getYear();
            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate firstDayOfMonth = yearMonth.atDay(1);
            LocalDate endDayOfMonth = yearMonth.atEndOfMonth();
            listIdDate = orderDateRepo.findListIdInMonth(firstDayOfMonth, endDayOfMonth);
            ammountBlood = orderDonationRepo.sumBloodAmountByStatus(completedCode, listIdDate).orElse(0.0f);
        }
        return BloodOrderStaticResponse.builder()
                .countAllOrderDonation
                        (orderDonationRepo.countAllColumnOrderByStatus(listIdDate))
                .countAllOrderDonationWaiting
                        (orderDonationRepo.countColumnOrderByStatus(processingCode ,confirmedCode , listIdDate))
                .countAllOrderDonationCompleted
                        (orderDonationRepo.countColumnOrderByStatus(completedCode, completedCode, listIdDate))
                .countAllOrderDonationDenied
                        (orderDonationRepo.countColumnOrderByStatus(refusedCode, canceledCode, listIdDate))
                .donationBloodAmount
                        (ammountBlood)
                .build();

    }
    public BloodOrderStaticResponse getBloodReceiveStatic(int whatDay, boolean rightMonth) {
        LocalDate today = LocalDate.now().minusDays(whatDay);
        System.out.println(today);
        Float ammountBlood = 0.0f;
        if(!rightMonth) {
            ammountBlood = orderReceiveRepo.sumBloodAmountByStatus(completedCode, today).orElse(0.0f);
            return BloodOrderStaticResponse.builder()
                    .countAllOrderReceive
                            (orderReceiveRepo.countAllColumnOrderByStatus(today))
                    .countAllOrderReceiveWaiting
                            (orderReceiveRepo.countColumnOrderByStatus(today, processingCode, confirmedCode))
                    .countAllOrderReceiveCompleted
                            (orderReceiveRepo.countColumnOrderCompleted(today))
                    .countAllOrderReceiveDenied
                            (orderReceiveRepo.countColumnOrderByStatus(today, refusedCode, canceledCode))
                    .receiveBloodAmount
                            (ammountBlood)
                    .build();
        }else {
            int month = today.getMonthValue();
            int year = today.getYear();
            YearMonth yearMonth = YearMonth.of(year, month);
            LocalDate firstDayOfMonth = yearMonth.atDay(1);
            LocalDate endDayOfMonth = yearMonth.atEndOfMonth();
            ammountBlood = orderReceiveRepo.sumBloodAmountByStatusInMonth(completedCode, firstDayOfMonth, endDayOfMonth).orElse(0.0f);
            return BloodOrderStaticResponse.builder()
                    .countAllOrderReceive
                            (orderReceiveRepo.countAllColumnOrderByStatusInMonth(firstDayOfMonth,endDayOfMonth))
                    .countAllOrderReceiveWaiting
                            (orderReceiveRepo.countColumnOrderByStatusInMonth(firstDayOfMonth,endDayOfMonth, processingCode, confirmedCode))
                    .countAllOrderReceiveCompleted
                            (orderReceiveRepo.countColumnOrderCompletedInMonth(firstDayOfMonth,endDayOfMonth))
                    .countAllOrderReceiveDenied
                            (orderReceiveRepo.countColumnOrderByStatusInMonth(firstDayOfMonth,endDayOfMonth, refusedCode, canceledCode))
                    .receiveBloodAmount
                            (ammountBlood)
                    .build();
        }
    }
}
