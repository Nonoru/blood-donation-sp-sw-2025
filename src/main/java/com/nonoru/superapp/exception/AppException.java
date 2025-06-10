package com.nonoru.superapp.exception;

import lombok.Data;
import org.springframework.web.bind.MethodArgumentNotValidException;

@Data
public class AppException extends RuntimeException {
    private ErrorCode errorCode;

    public AppException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
