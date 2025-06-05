package com.nonoru.superapp.controller;

import com.nonoru.superapp.repository.AccMngRepository;
import com.nonoru.superapp.service.AccMngService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000/")
public class AdminAPI {
    @Autowired
    private AccMngService accMngService;
    @Autowired
    private AccMngRepository accMngRepository;


    @GetMapping("/get-all")
    public ResponseEntity<?> getAll() {
        boolean empty = accMngService.getAccMngList().isEmpty();
        return empty ?
            ResponseEntity.noContent().build() : ResponseEntity.ok(accMngService.getAccMngList());
    }
}
