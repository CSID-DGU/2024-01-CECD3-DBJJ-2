package domain;

import dto.response.ModelPredictionDto;
import dto.type.AnomalyLevel;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "prediction_logs")
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

    @Column(name = "request_timestamp", nullable = false)
    private LocalDateTime requestTimeStamp;

    @Column(name = "prediction_timestamp", nullable = false)
    private LocalDateTime predictionTimestamp;

    public static PredictionLog from(final ModelPredictionDto prediction) {
        return new PredictionLog();
    }
}
