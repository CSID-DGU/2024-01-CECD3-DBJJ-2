package org.dgu.dbjj.exception;

import org.dgu.dbjj.dto.common.type.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CommonException extends RuntimeException {
    private final ErrorCode errorCode;
}
