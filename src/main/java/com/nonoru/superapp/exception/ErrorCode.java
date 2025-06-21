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

    USER_NOTFOUND(15, "Không tìm thấy người dùng"),

    DOB_EMPTY(16, "Ngày sinh không thể bỏ trống"),
    DOB_MUST_IN_PAST(17, "Ngày sinh không thể vượt quá ngày hiện tại"),

    CCCD_NUMBER_EMPTY(18, "CCCD không thể bỏ trống"),
    CCCD_NUMBER_INVALID(19, "CCCD không đúng định dạng hoặc vượt quá độ dài cho phép"),

    PHONE_EMPTY(20, "Số điện thoại không thể bỏ trống"),
    PHONE_INVALID(21, "Số điện thoại không đúng định dạng hoặc quá độ dài cho phép"),

    ADDRESS_EMPTY(22, "Địa chỉ thường chú không thể bỏ trống"),

    YEAR_LOWER_18(23, "Người dưới 18 tuổi không được phép hiến máu"),
    AMMOUNT_BLOOD_ERROR(24, "Bạn không thể hiến với lượng máu này so với cân nặng của bạn"),

    BLOOD_ID_NOTFOUND(25, "Nhóm máu không tồn tại"),
    ORDER_DATE_ID_NOTFOUND(26, "Ngày đặt lịch không tồn tại"),
    ROLE_ID_NOTFOUND(27, "Vai trò không tồn tại"),

    CLINIC_ID_NOTFOUND(28, "Phòng khám không tìm thấy"),

    ORDER_DATE_EMPTY(29, "Ngày đặt lịch không thể bỏ trống"),
    ORDER_DATE_MUST_IN_FUTURE(30,"Ngày đặt lịch phải ở tương lai"),
    ORDER_TIME_EMPTY(32, "Giờ đặt lịch không thể bỏ trống"),
    ORDER_TIME_MUST_IN_FUTURE(32,"Giờ đặt lịch phải ở tương lai"),
    ORDER_TIME_EXISTED_IN_DAY(33, "Thời gian này đã được tạo trong ngày"),
    ;
    private int code;
    private String message;


    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
