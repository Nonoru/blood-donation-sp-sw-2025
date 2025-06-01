package com.nonoru.superapp.service;

//import com.nonoru.superapp.entity.UserInformation;
import com.nonoru.superapp.entity.RoleAccount;
import com.nonoru.superapp.entity.UserRegisterError;
import com.nonoru.superapp.repository.RoleRepository;
import com.nonoru.superapp.request.UserRegisterRequest;
import com.nonoru.superapp.entity.UserAccount;
import com.nonoru.superapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service

public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    public boolean checkPassword(String rawPassword, String hashedPassword) {
        return bCryptPasswordEncoder.matches(rawPassword, hashedPassword);
    }
    @Override
    public UserRegisterError registerAccount (UserRegisterRequest request) {
        UserRegisterError error = new UserRegisterError();
        boolean errorFound = false;
        if(userRepository.existsByUsername(request.getUsername())) {
            error.setExistUsername("Tên người dùng đã tồn tại");
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
            String rawPassword = request.getPassword();
            String hashedPassword = bCryptPasswordEncoder.encode(rawPassword);
            RoleAccount role =
                    roleRepository.findById(request.getRoleId())
                    .orElseThrow(() -> new RuntimeException( "Role not existed"));
            System.out.println(role.toString());
            if(checkPassword(rawPassword, hashedPassword)) {
                UserAccount userAccount = new UserAccount(
                        request.getUsername(), hashedPassword, request.getEmail(), role);

                userRepository.save(userAccount);
            }
        }
        return error;
    }

}
