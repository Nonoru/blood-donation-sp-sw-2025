package com.nonoru.superapp.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_NOT_FOUND(0, "Lỗi hệ thống"),

    USER_EXISTED(1, "Tên tài khoản đã tồn tại"),
    USER_LENGTH_INVALID(2, "Độ dài tên tài khoản không hợp lệ"),
    USER_CONTAIN_ERROR_SYMBOL(3, "Tên tài khoản chứa các kí tự không hợp lệ"),
    USER_EMPTY(4, "Tên tài khoản không được bỏ trống"),

    EMAIL_EXISTED(4, "Email đã được sử dụng"),
    EMAIL_EMPTY(5, "Email không thể bỏ trống"),
    EMAIL_INVALID(6, "Email không đúng định dạng"),

    PASSWORD_LENGTH_INVALID(7, "Độ dài mật khẩu không hợp lệ"),
    PASSWORD_CONTAIN_ERROR_SYMBOL(8, "Mật khẩu chứa các kí tự không hợp lệ"),
    PASSWORD_CONFIRM_INCORRECT(9, "Nhập lại mật khẩu không chính xác"),
    PASSWORD_CONFIRM_EMPTY(10, "Nhập lại mật khẩu không thể bỏ trống"),

    FULL_NAME_EMPTY(11, "Họ và tên không thể bỏ trống");


    private int code;
    private String message;


    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
