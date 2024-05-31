package dto.response;

import java.time.LocalDateTime;

public record ModelEvaluationDto(
        String modelVersion,
        Double accuracy,
        LocalDateTime evaluationTime

) {
}
