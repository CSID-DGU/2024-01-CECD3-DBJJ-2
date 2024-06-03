from core.pipelines.pipeline import Pipeline


class PredictPipeline(Pipeline):
    _instance = None

    @classmethod
    def get_instance(cls) -> Pipeline:
        if cls._instance is None:
            cls._instance = PredictPipeline()
        return cls._instance

    def run(self):
        return None