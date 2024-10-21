package org.dgu.dbjj.domain;

import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.dgu.dbjj.dto.response.ModelPredictionDto;
import org.dgu.dbjj.dto.type.AnomalyLevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "prediction_logs")
@Slf4j
public class PredictionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "model_version", nullable = false)
    private String modelVersion;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "is_anomaly", nullable = false)
    private Boolean isAnomaly;

    @Column(name = "anomaly_score", nullable = false)
    private Double anomalyScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "anomaly_level", nullable = false)
    private AnomalyLevel anomalyLevel;

    @Column(name = "request_timestamp")
    private LocalDateTime requestTimeStamp;

    @Column(name = "prediction_timestamp")
    private LocalDateTime predictionTimestamp;


    public static PredictionLog of(final ModelPredictionDto prediction, final LocalDateTime requestTime) {
        log.info("of method");
        return new PredictionLog(prediction, requestTime);
    }

    protected PredictionLog(final ModelPredictionDto prediction, final LocalDateTime requestTime) {
        log.info("constructor");
        this.modelVersion = prediction.modelVersion();
        log.info(prediction.modelVersion());
        this.imageUrl = prediction.imageUrl();
        log.info(prediction.imageUrl());
        this.isAnomaly = prediction.isAnomaly();
        log.info(prediction.isAnomaly().toString());
        this.anomalyScore = prediction.anomalyScore();
        log.info(prediction.anomalyScore().toString());
        this.anomalyLevel = prediction.anomalyLevel();
        log.info(prediction.anomalyLevel().toString());
        this.requestTimeStamp = requestTime;
        this.predictionTimestamp = prediction.predictionTime();
        log.info(prediction.predictionTime().toString());
    }
}
