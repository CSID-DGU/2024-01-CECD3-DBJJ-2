from django.http import HttpRequest, JsonResponse
from core.pipelines.pipeline_proxy import PipelineProxy

from core.dto.common.response_dto import ResponseDto
from django.views.decorators.csrf import csrf_exempt

pipeline_proxy = PipelineProxy()

def train(request: HttpRequest) -> JsonResponse:
    # PipelineProxy.train()
    return ResponseDto.success()


@csrf_exempt
def predict(request: HttpRequest) -> JsonResponse:
    return ResponseDto.success_with_data(pipeline_proxy.predict().to_dict())
