package controller;

import dto.request.PredictDto;
import dto.response.ModelEvaluationDto;
import dto.response.ModelPredictionDto;
import dto.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.ModelService;

@RestController
@RequestMapping("/api/models")
@RequiredArgsConstructor
public class ModelController {

    private final ModelService modelService;

    @PostMapping("/train")
    public ResponseDto<?> train() {
        modelService.train();
        return ResponseDto.success();
    }

    @PostMapping("/evaluate")
    public ResponseDto<ModelEvaluationDto> evaluate() {
        ModelEvaluationDto modelEvaluationDto = modelService.evaluate();
        return ResponseDto.success(modelEvaluationDto);
    }

    @PostMapping("/predict")
    public ResponseDto<ModelPredictionDto> predict(@RequestBody final PredictDto predictDto) {
        ModelPredictionDto modelPredictionDto = modelService.predict(predictDto.imageUrl());
        return ResponseDto.success(modelPredictionDto);
    }
}
