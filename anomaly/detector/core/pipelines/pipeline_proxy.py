from core.pipelines.impl.predict_pipeline import PredictPipeline
from core.pipelines.impl.train_pipeline import TrainPipeline
from core.pipelines.pipeline import Pipeline


class PipelineProxy:
    _train_instance = None
    _predict_instance = None

    def train(self):
        train_instance = self.get_train_instance()
        train_instance.run()

    def predict(self):
        predict_instance = self.get_predict_instance()
        predict_instance.run()

    def update_predict_instance(self, instance):
        # TODO: update .pkl file
        self._predict_instance = instance

    def get_train_instance(self) -> Pipeline:
        if self._train_instance is None:
            self._train_instance = TrainPipeline.get_instance()
        return self._train_instance

    def get_predict_instance(self) -> Pipeline:
        if self._predict_instance is None:
            self._predict_instance = PredictPipeline.get_instance()
        return self._predict_instance
