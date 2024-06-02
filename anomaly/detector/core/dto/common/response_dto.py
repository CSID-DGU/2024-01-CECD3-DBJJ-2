from django.http import JsonResponse


class ResponseDto:
    def __init__(self, success: bool, data, error):
        self.success: bool = success
        self.data = data
        self.error = error

    @staticmethod
    def success():
        return JsonResponse(ResponseDto(True, None, None).json_serialize())

    @staticmethod
    def success_with_data(data):
        return JsonResponse(ResponseDto(True, data, None).json_serialize())

    @staticmethod
    def error(error):
        return JsonResponse(ResponseDto(False, None, error).json_serialize())

    def json_serialize(self):
        response = {
            "success": self.success
        }
        if self.data is not None:
            response["data"] = self.data
        if self.error is not None:
            response["error"] = self.error
        return response
