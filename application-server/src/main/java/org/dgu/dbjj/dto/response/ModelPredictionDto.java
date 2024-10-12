package org.dgu.dbjj.dto.response;

import org.dgu.dbjj.dto.type.AnomalyLevel;
import java.time.LocalDateTime;

public record ModelPredictionDto(
        String modelVersion,
        Boolean isAnomaly,
        AnomalyLevel anomalyLevel,
        Double accuracy,
        Double anomalyScore,
        String imageUrl,
        LocalDateTime predictionTime
) {
}
