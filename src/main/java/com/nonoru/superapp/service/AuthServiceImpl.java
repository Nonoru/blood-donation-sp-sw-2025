package com.nonoru.superapp.service;

//import com.nonoru.superapp.entity.UserInformation;
import com.nonoru.superapp.entity.UserRegisterError;
import com.nonoru.superapp.request.UserRegisterRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserRegisterError registerAccount (UserRegisterRequest request) {
        UserRegisterError error = new UserRegisterError();
        boolean errorFound = false;
        if(userRepository.existsByUsername(request.getUsername())) {
            error.setExistUsername("Username đã tồn tại");
            errorFound = true;
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            error.setExistEmail("Email đã tổn tại");
            errorFound = true;
        }
        if(!request.getPassword().equals(request.getPasswordConfirm())) {
            error.setErrorConfirmPassword("Nhập lại mật khẩu không chính xác");
            errorFound = true;
        }
        if(!errorFound) {
            UserAccount userAccount = new UserAccount(request.getUsername(), request.getPassword(), request.getEmail());
            userRepository.save(userAccount);
        }
        return error;
    }

}
