from core.pipelines.pipeline import Pipeline
from core.dto.predict.result import Result
import logging

logging.basicConfig(level=logging.INFO)

class PredictPipeline(Pipeline):
    _instance = None

    @classmethod
    def get_instance(cls) -> Pipeline:
        if cls._instance is None:
            cls._instance = PredictPipeline()
        return cls._instance

    def run(self) -> Result:
        # TODO: implement model call logic
        return Result("1.0", "1", "0.99", "0.99", "http://image_url", "1.0")
    