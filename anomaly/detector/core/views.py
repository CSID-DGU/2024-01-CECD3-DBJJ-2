from django.http import HttpResponse, HttpRequest, JsonResponse

from core.pipelines.pipeline import Pipeline
from core.pipelines.pipeline_proxy import PipelineProxy


# Create your views here.
def train(request: HttpRequest) -> HttpResponse:
    # PipelineProxy.train()
    return JsonResponse(
        {
            "status": "success"
        }
    )

def predict(request: HttpRequest) -> HttpResponse:
    # PipelineProxy.predict()
    return JsonResponse(
        {
            "status": "success"
        }
    )