package util;

import dto.response.ModelEvaluationDto;
import dto.response.ModelPredictionDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

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

        ModelPredictionDto prediction = restTemplate.getForEntity(predictUrl, ModelPredictionDto.class, params).getBody();

        log.info("Prediction: {}", prediction);
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
