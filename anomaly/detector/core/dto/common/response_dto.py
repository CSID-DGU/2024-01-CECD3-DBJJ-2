class ResponseDto:
    def __init__(self, success: bool, data, error):
        self.success: bool = success
        self.data = data
        self.error = error

    @staticmethod
    def success():
        return ResponseDto(True, None, None)

    @staticmethod
    def success_with_data(data):
        return ResponseDto(True, data, None)

    @staticmethod
    def error(error):
        return ResponseDto(False, None, error)
