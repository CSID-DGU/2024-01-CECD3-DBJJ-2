package dto.common;

import dto.common.type.ErrorCode;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ExceptionDto {

    private final int code;
    private final String message;

    public static ExceptionDto from(final ErrorCode errorCode) {
        return new ExceptionDto(errorCode.getCode(), errorCode.getMessage());
    }

    public static ExceptionDto of(final int code, final String message) {
        return new ExceptionDto(code, message);
    }
}
