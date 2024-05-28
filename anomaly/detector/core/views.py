from django.http import HttpResponse, HttpRequest, JsonResponse

from core.pipelines.impl.predict_pipeline import PredictPipeline
from core.pipelines.impl.train_pipeline import TrainPipeline
from core.pipelines.pipeline import Pipeline


# Create your views here.
def train(request: HttpRequest) -> HttpResponse:
    pipeline: Pipeline = TrainPipeline()

def predict(request: HttpRequest) -> HttpResponse:
    pipeline: Pipeline = PredictPipeline()