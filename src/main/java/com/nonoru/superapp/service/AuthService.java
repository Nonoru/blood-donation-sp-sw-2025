package com.nonoru.superapp.service;

import com.nonoru.superapp.entity.UserRegisterError;
import com.nonoru.superapp.request.UserRegisterRequest;

public interface AuthService {
    UserRegisterError registerAccount(UserRegisterRequest request);
}
