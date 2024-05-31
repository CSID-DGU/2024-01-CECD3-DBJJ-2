package service;

import domain.PredictionLog;
import dto.response.ModelEvaluationDto;
import dto.response.ModelPredictionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.PredictionLogRepository;
import util.RestTemplateUtil;

@Service
@RequiredArgsConstructor
public class ModelService {

    private final RestTemplateUtil restTemplateUtil;
    private final PredictionLogRepository predictionLogRepository;

    public void train() {
        restTemplateUtil.trainModel();
    }

    public ModelEvaluationDto evaluate() {
        return restTemplateUtil.evaluateModel();
    }

    @Transactional
    public ModelPredictionDto predict(final String imageUrl) {
        ModelPredictionDto prediction = restTemplateUtil.getPrediction(imageUrl);
        savePredictionLog(prediction);
        return null;
    }

    protected void savePredictionLog(final ModelPredictionDto modelPredictionDto) {
        predictionLogRepository.save(PredictionLog.from(modelPredictionDto));
    }
}
