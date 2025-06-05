package com.nonoru.superapp.service;

import com.nonoru.superapp.request.RegisterAccountRequest;

import java.util.Map;

public interface AuthService {
    Map<String, String> registerAccount(RegisterAccountRequest request);
}
