package com.nonoru.superapp.enums;

import lombok.Getter;

@Getter
public enum StatusOfOrderReceiving {
    PENDING(1,"Đang chờ kiểm duyệt"),
    PROCESSING(2,"Đang chờ vận chuyển"),
    COMPLETED(3,"Đơn đã hoàn tất"),
    REFUSED(4,"Đơn bị từ chối"),
    CANCELED(5, "Đơn đã bị hủy");
    private final int statusCode;
    private final String statusDescription;

    StatusOfOrderReceiving(int statusCode, String statusDescription) {
        this.statusCode = statusCode;
        this.statusDescription = statusDescription;
    }
}
