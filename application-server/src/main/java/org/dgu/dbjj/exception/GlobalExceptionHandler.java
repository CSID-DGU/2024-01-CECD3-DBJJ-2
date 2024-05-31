package org.dgu.dbjj.exception;

import org.dgu.dbjj.dto.common.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {IllegalArgumentException.class, MethodArgumentNotValidException.class})
    public ResponseDto<?> handleIllegalArgumentException(IllegalArgumentException e) {
        log.error("IllegalArgumentException occurred: {}", e.getMessage());
        return ResponseDto.fail(e);
    }

    @ExceptionHandler(value = {CommonException.class})
    public ResponseDto<?> handleCommonException(CommonException e) {
        log.error("CommonException occurred: {}", e.getMessage());
        e.printStackTrace();
        return ResponseDto.fail(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }

    @ExceptionHandler(value = {Exception.class})
    public ResponseDto<?> handleException(Exception e) {
        log.error("Exception occurred: {}", e.getMessage());
        e.printStackTrace();
        return ResponseDto.fail(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
}
