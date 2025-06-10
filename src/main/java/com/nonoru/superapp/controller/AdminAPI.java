package com.nonoru.superapp.controller;

import com.nonoru.superapp.service.ManageAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000/")
public class AdminAPI {
    @Autowired
    private ManageAccountService service;

}
