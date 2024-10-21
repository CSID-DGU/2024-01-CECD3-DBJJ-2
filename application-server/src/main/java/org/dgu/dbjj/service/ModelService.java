package org.dgu.dbjj.service;

import lombok.extern.slf4j.Slf4j;
import org.dgu.dbjj.domain.PredictionLog;
import org.dgu.dbjj.dto.response.ModelEvaluationDto;
import org.dgu.dbjj.dto.response.ModelPredictionDto;
import lombok.RequiredArgsConstructor;
import org.dgu.dbjj.util.RestTemplateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.dgu.dbjj.repository.PredictionLogRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
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
    public PredictionLog predict(final String imageUrl) {
        LocalDateTime requestTime = LocalDateTime.now();
        ModelPredictionDto prediction = restTemplateUtil.getPrediction(imageUrl);
        return savePredictionLog(prediction, requestTime);
    }

    protected PredictionLog savePredictionLog(final ModelPredictionDto modelPrediction, final LocalDateTime requestTime) {
        return predictionLogRepository.save(PredictionLog.of(modelPrediction, requestTime));
    }
}
