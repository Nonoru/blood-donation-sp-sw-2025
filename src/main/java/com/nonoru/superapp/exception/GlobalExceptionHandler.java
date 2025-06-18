package com.nonoru.superapp.exception;

import ch.qos.logback.core.spi.ErrorCodes;
import com.nonoru.superapp.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Comparator;
import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(){
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(ErrorCode.UNCATEGORIZED_NOT_FOUND.getCode());
        apiResponse.setMessage(ErrorCode.UNCATEGORIZED_NOT_FOUND.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler
    ResponseEntity<ApiResponse> handlingAppException(AppException exception){
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        List<FieldError> fieldErrors = exception.getBindingResult().getFieldErrors();
        List<String> priorityOrder = List.of(
                "USER_EMPTY", "USER_LENGTH_INVALID", "USER_CONTAIN_ERROR_SYMBOL",
                "PASSWORD_EMPTY","PASSWORD_LENGTH_INVALID","PASSWORD_CONTAIN_ERROR_SYMBOL","PASSWORD_CONFIRM_EMPTY",
                "EMAIL_EMPTY", "EMAIL_INVALID",
                "FULL_NAME_EMPTY",
                "DOB_EMPTY", "DOB_MUST_IN_PAST",
                "CCCD_NUMBER_EMPTY", "CCCD_NUMBER_INVALID",
                "PHONE_EMPTY", "PHONE_INVALID",
                "ADDRESS_EMPTY", "YEAR_LOWER_18", "AMMOUNT_BLOOD_ERROR"
        );

        FieldError prioritizedError = fieldErrors.stream()
                .sorted(Comparator.comparingInt(e -> {
                    String code = e.getDefaultMessage();
                    int index = priorityOrder.indexOf(code);
                    return index < 0 ? Integer.MAX_VALUE : index;
                }))
                .findFirst()
                .orElse(null);

        ApiResponse apiResponse = new ApiResponse();
        String enumKey = prioritizedError.getDefaultMessage();
        ErrorCode errorCode = ErrorCode.valueOf(enumKey);
        if(errorCode == null){
            errorCode = ErrorCode.valueOf("UNCATEGORIZED_NOT_FOUND");
        }
        apiResponse.setCode(errorCode.getCode());
        apiResponse.setMessage(errorCode.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }
}
