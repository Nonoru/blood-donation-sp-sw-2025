package com.nonoru.superapp.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_NOT_FOUND(0, "Lỗi hệ thống"),
    USER_EXISTED(1, "Tài khoản đã tồn tại"),
    USER_LENGTH_INVALID(2, "Tài khoản đã tồn tại"),
    EMAIL_EXISTED(3, "Email đã được sử dụng"),
    PASSWORD_LENGTH_INVALID(4, "Tài khoản đã tồn tại"),
    PASSWORD_CONFIRM_INCORRECT(5, "Nhập lại mật khẩu không chính xác");

    private int code;
    private String message;


    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
