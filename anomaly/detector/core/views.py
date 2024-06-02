from django.http import HttpRequest, JsonResponse

from core.dto.common.response_dto import ResponseDto
from django.views.decorators.csrf import csrf_exempt


def train(request: HttpRequest) -> JsonResponse:
    # PipelineProxy.train()
    return ResponseDto.success()


@csrf_exempt
def predict(request: HttpRequest) -> JsonResponse:
    # PipelineProxy.predict()
    return ResponseDto.success()
