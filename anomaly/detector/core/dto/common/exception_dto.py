from core.dto.common.error_code import ErrorCode


class ExceptionDto:
    def __init__(self, error_code: ErrorCode):
        self.status: int = error_code.value
        self.message: str = error_code.name

    @staticmethod
    def of(error_code: ErrorCode):
        return ExceptionDto(error_code)
