package com.nonoru.superapp.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CancelReasonReceiveRequest {
    private Long orderReceiveId;
    private Long cancelReasonId;
    private String otherReason;
}
