package dto.response;

import dto.type.AnomalyLevel;
import java.time.LocalDateTime;

public record ModelPredictionDto(
        String modelVersion,
        AnomalyLevel anomalyLevel,
        Double accuracy,
        Double anomalyScore,
        String imageUrl,
        LocalDateTime predictionTime
) {
}
