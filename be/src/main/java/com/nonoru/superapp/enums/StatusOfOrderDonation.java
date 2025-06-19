package com.nonoru.superapp.enums;

import lombok.Getter;

@Getter
public enum StatusOfOrderDonation {
    PROCESSING(1,"Đang chờ kiểm duyệt"),
    COMFRIMMED(2,"Đơn đã được xét duyệt"),
    COMPLETED(3,"Đơn đã hoàn tất"),
    REFUSED(4,"Đơn bị từ chối");
    private int statusCode;
    private String statusDescription;

    StatusOfOrderDonation(int statusCode, String statusDescription) {
        this.statusCode = statusCode;
        this.statusDescription = statusDescription;
    }
}
