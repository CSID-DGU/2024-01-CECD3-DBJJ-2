import json
import logging

class Result:
    def __init__(self, model_version, anomaly_level, accuracy, anomaly_score, image_url, prediction_time):
        self.model_version = model_version
        self.anomaly_level = anomaly_level
        self.accuracy = accuracy
        self.anomaly_score = anomaly_score
        self.image_url = image_url
        self.prediction_time = prediction_time
    
    def to_dict(self):
        return {
            "model_version": self.model_version,
            "anomaly_level": self.anomaly_level,
            "accuracy": self.accuracy,
            "anomaly_score": self.anomaly_score,
            "image_url": self.image_url,
            "prediction_time": self.prediction_time
        }
    
    def __str__(self):
        return f"Result(model_version={self.model_version}, anomaly_level={self.anomaly_level} accuracy={self.accuracy}, anomaly_score={self.anomaly_score}, image_url={self.image_url}"
