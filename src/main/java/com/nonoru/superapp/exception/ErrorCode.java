package com.nonoru.superapp.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public enum ErrorCode {
    UNCATEGORIZED_NOT_FOUND(0, "Có lỗi xảy ra"),
    USER_EMPTY(1, "Tên tài khoản không được bỏ trống"),
    USER_LENGTH_INVALID(2, "Độ dài tên tài khoản không hợp lệ"),
    USER_CONTAIN_ERROR_SYMBOL(3, "Tên tài khoản chứa các kí tự không hợp lệ"),
    USER_EXISTED(4, "Tên tài khoản đã tồn tại"),


    EMAIL_EXISTED(5, "Email đã được sử dụng"),
    EMAIL_EMPTY(6, "Email không thể bỏ trống"),
    EMAIL_INVALID(7, "Email không đúng định dạng"),

    PASSWORD_EMPTY(8, "Mật khẩu không được bỏ trống"),
    PASSWORD_LENGTH_INVALID(9, "Độ dài mật khẩu không hợp lệ"),
    PASSWORD_CONTAIN_ERROR_SYMBOL(10, "Mật khẩu chứa các kí tự không hợp lệ"),
    PASSWORD_CONFIRM_EMPTY(11, "Nhập lại mật khẩu không thể bỏ trống"),
    PASSWORD_CONFIRM_INCORRECT(12, "Nhập lại mật khẩu không chính xác"),

    FULL_NAME_EMPTY(13, "Họ và tên không thể bỏ trống"),

    LOGIN_FAIL(14, "Thông tin đăng nhập không chính xác"),

    USER_NOTFOUND(15, "Không tìm thấy người dùng");
    private int code;
    private String message;


    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
