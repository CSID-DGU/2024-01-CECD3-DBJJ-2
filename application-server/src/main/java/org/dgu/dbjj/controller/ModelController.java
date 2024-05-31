package org.dgu.dbjj.controller;

import org.dgu.dbjj.dto.request.PredictDto;
import org.dgu.dbjj.dto.response.ModelEvaluationDto;
import org.dgu.dbjj.dto.response.ModelPredictionDto;
import org.dgu.dbjj.dto.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.dgu.dbjj.service.ModelService;

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
