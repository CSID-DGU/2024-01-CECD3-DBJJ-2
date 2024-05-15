package dto.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import dto.common.type.ErrorCode;
import exception.CommonException;
import jakarta.annotation.Nullable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ResponseDto<T> {

    @JsonIgnore
    private final HttpStatus httpStatus;

    @NonNull
    private final Boolean success;

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final T data;

    @Nullable
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final ExceptionDto error;

    public static <T> ResponseDto<T> success() {
        return new ResponseDto<T>(HttpStatus.OK, true, null, null);
    }

    public static <T> ResponseDto<T> success(@NonNull final T data) {
        return new ResponseDto<T>(HttpStatus.OK, true, data, null);
    }

    public static ResponseDto<?> fail(@NonNull final Exception e) {
        return new ResponseDto<>(HttpStatus.BAD_REQUEST, false, null, ExceptionDto.from(ErrorCode.BAD_REQUEST));
    }

    public static ResponseDto<?> fail(@NonNull final HttpStatus httpStatus, @NonNull final CommonException e) {
        return new ResponseDto<>(httpStatus, false, null, ExceptionDto.from(e.getErrorCode()));
    }

    public static ResponseDto<?> fail(@NonNull final HttpStatus httpStatus, @NonNull final Exception e) {
        return new ResponseDto<>(httpStatus, false, null, ExceptionDto.of(ErrorCode.INTERNAL_SERVER_ERROR.getCode(), e.getMessage()));
    }
}
