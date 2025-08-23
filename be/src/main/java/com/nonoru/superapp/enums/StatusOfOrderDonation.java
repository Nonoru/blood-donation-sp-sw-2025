package com.nonoru.superapp.enums;

import lombok.Getter;

@Getter
public enum StatusOfOrderDonation {
    PENDING(1,"Đang chờ kiểm duyệt"),
    PROCESSING(2,"Đang chờ hiến máu"),
    COMPLETED(3,"Đơn đã hoàn tất"),
    REFUSED(4,"Đơn bị từ chối"),
    CANCELED(5, "Đơn đã bị hủy");
    private int statusCode;
    private String statusDescription;

    StatusOfOrderDonation(int statusCode, String statusDescription) {
        this.statusCode = statusCode;
        this.statusDescription = statusDescription;
    }
}
