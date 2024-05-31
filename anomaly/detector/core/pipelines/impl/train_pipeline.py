from core.pipelines.pipeline import Pipeline


class TrainPipeline(Pipeline):
    _instance = None

    @classmethod
    def get_instance(cls) -> Pipeline:
        if cls._instance is None:
            cls._instance = TrainPipeline()
        return cls._instance

    def run(self):
        return None
