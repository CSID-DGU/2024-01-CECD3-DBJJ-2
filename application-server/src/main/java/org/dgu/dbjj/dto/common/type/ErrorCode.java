package org.dgu.dbjj.dto.common.type;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum ErrorCode {

    // 400 - BAD REQUEST
    BAD_REQUEST(HttpStatus.BAD_REQUEST, 40000, "Bad Request"),

    // 401 - UNAUTHORIZED
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 40100, "Unauthorized"),

    // 403 - FORBIDDEN
    FORBIDDEN(HttpStatus.FORBIDDEN, 40300, "Forbidden"),

    // 404 - NOT FOUND
    NOT_FOUND(HttpStatus.NOT_FOUND, 40400, "Not Found"),

    // 405 - METHOD NOT ALLOWED
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, 40500, "Method Not Allowed"),

    // 406 - NOT ACCEPTABLE
    NOT_ACCEPTABLE(HttpStatus.NOT_ACCEPTABLE, 40600, "Not Acceptable"),

    // 409 - CONFLICT
    CONFLICT(HttpStatus.CONFLICT, 40900, "Conflict"),

    // 500 - INTERNAL SERVER ERROR
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 50000, "Internal Server Error")
    ;

    private HttpStatus status;
    private int code;
    private String message;
}
