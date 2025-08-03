package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.request.AcceptReceiveOrderRequest;
import com.nonoru.superapp.dto.response.BloodBagResponse;
import com.nonoru.superapp.entity.BloodBag;
import com.nonoru.superapp.entity.OrderBloodReceive;
import com.nonoru.superapp.exception.AppException;
import com.nonoru.superapp.exception.ErrorCode;
import com.nonoru.superapp.repository.BloodBagRepository;
import com.nonoru.superapp.repository.OrderBloodReceiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BloodBagService {
    @Autowired
    private BloodBagRepository bloodBagRepository;
    
    @Autowired
    private OrderBloodReceiveRepository orderBloodReceiveRepository;

    public List<BloodBagResponse> getAllBloodBagsForStaff() {
        List<BloodBag> bloodBags = bloodBagRepository.findAll();
        List<BloodBagResponse> bloodBagResponses = new ArrayList<>();
        for (BloodBag bloodBag : bloodBags) {
            int status = 0;
            if(!bloodBag.getExpiryDate().isAfter(java.time.LocalDateTime.now())){
                status = 1;
            }else if(bloodBag.isDelivered()){
                status = 2;
            }else if(!bloodBag.isDelivered() && !bloodBag.isExisted()){
                status = 3;
            }else{
                status = 4;
            }

            BloodBagResponse bloodBagResponse = BloodBagResponse.builder()
                    .bloodBagId(bloodBag.getBloodBagId())
                    .bloodType(bloodBag.getBloodType().getBloodType())
                    .volumeMl(bloodBag.getVolumeMl())
                    .collectionDate(bloodBag.getCollectionDate())
                    .expiryDate(bloodBag.getExpiryDate())
                    .status(status)
                    .build();
            bloodBagResponses.add(bloodBagResponse);
        }
        return bloodBagResponses;
    }
    public List<BloodBagResponse> getBloodBagsValid() {
        List<BloodBag> bloodBags = bloodBagRepository.findAll();
        List<BloodBagResponse> bloodBagResponses = new ArrayList<>();
        for (BloodBag bloodBag : bloodBags) {
            if(bloodBag.isExisted() && bloodBag.getExpiryDate().isAfter(java.time.LocalDateTime.now())){
                BloodBagResponse bloodBagResponse = BloodBagResponse.builder()
                        .bloodBagId(bloodBag.getBloodBagId())
                        .bloodType(bloodBag.getBloodType().getBloodType())
                        .volumeMl(bloodBag.getVolumeMl())
                        .collectionDate(bloodBag.getCollectionDate())
                        .expiryDate(bloodBag.getExpiryDate())
                        .build();
                bloodBagResponses.add(bloodBagResponse);
            }
        }
        return bloodBagResponses;
    }

    public void updateBloodBagsForReceiveOrder(AcceptReceiveOrderRequest request) {
        // Lấy order receive từ database
        Optional<OrderBloodReceive> orderReceiveOpt = orderBloodReceiveRepository.findById(request.getOrderReceivingId());
        if (orderReceiveOpt.isEmpty()) {
            throw new AppException(ErrorCode.ORDER_RECEIVE_NOT_FOUND);
        }
        
        OrderBloodReceive orderReceive = orderReceiveOpt.get();
        
        // Cập nhật từng blood bag được chọn
        for (Long bloodBagId : request.getBloodBagIds()) {
            Optional<BloodBag> bloodBagOpt = bloodBagRepository.findById(bloodBagId);
            if (bloodBagOpt.isPresent()) {
                BloodBag bloodBag = bloodBagOpt.get();
                
                // Cập nhật trạng thái blood bag
                bloodBag.setOrderBloodReceive(orderReceive);
                bloodBag.setDelivered(true);
                bloodBag.setExisted(false);
                
                // Lưu vào database
                bloodBagRepository.save(bloodBag);
            }
        }
    }

}
