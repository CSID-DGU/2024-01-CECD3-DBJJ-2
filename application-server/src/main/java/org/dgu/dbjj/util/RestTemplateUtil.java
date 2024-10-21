package org.dgu.dbjj.util;

import org.dgu.dbjj.dto.django.ResponseWrapper;
import org.dgu.dbjj.dto.response.ModelEvaluationDto;
import org.dgu.dbjj.dto.response.ModelPredictionDto;
import lombok.extern.slf4j.Slf4j;
import org.dgu.dbjj.dto.type.AnomalyLevel;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;

@Slf4j
@Component
public class RestTemplateUtil {

    @Value("${api.proxy-url}")
    private String proxyUrl;

    @Value("${api.train-url}")
    private String trainUrl;

    @Value("${api.evaluate-url}")
    private String evaluateUrl;

    @Value("${api.predict-url}")
    private String predictUrl;

    RestTemplate restTemplate = new RestTemplate();

    public ModelPredictionDto getPrediction(final String imageUrl) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("imageUrl", imageUrl);

        log.info("Getting prediction from model");
        log.info("Image URL: {}", imageUrl);
        log.info("Predict URL: {}", predictUrl);

        LinkedHashMap<String, ?> response = (LinkedHashMap<String, ?>) restTemplate.getForEntity(predictUrl, ResponseWrapper.class, params).getBody().getData();
        ModelPredictionDto prediction = new ModelPredictionDto(
                response.get("model_version").toString(),
                !response.get("anomaly_level").toString().equals(AnomalyLevel.NORMAL.getLevel()),
                AnomalyLevel.valueOf(response.get("anomaly_level").toString()),
                Double.parseDouble(response.get("accuracy").toString()),
                Double.parseDouble(response.get("anomaly_score").toString()),
                response.get("image_url").toString(),
                LocalDateTime.parse(response.get("prediction_time").toString())
        );

        return prediction;
    }

    public void trainModel() {
        log.info("Training model");
        log.info("Train URL: {}", trainUrl);

        restTemplate.getForEntity(trainUrl, Void.class);
    }

    public ModelEvaluationDto evaluateModel() {
        log.info("Evaluating model");
        log.info("Evaluate URL: {}", evaluateUrl);

        ModelEvaluationDto evaluation = restTemplate.getForEntity(evaluateUrl, ModelEvaluationDto.class).getBody();

        log.info("Evaluation: {}", evaluation);
        return evaluation;
    }
}
