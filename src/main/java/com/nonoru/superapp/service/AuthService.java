package com.nonoru.superapp.service;

import com.nonoru.superapp.dto.UserRegisterRequest;

public interface AuthService {
    void register(UserRegisterRequest request);
}
