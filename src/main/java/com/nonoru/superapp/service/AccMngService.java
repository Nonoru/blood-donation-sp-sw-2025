package com.nonoru.superapp.service;

import com.nonoru.superapp.response.GetAllAccountResponse;
import com.nonoru.superapp.repository.AccMngRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccMngService {
    @Autowired
    private AccMngRepository accMngRepository;

    public List<GetAllAccountResponse> getAccMngList(){
        return accMngRepository.getAllUsersWithRole();
    }

}
