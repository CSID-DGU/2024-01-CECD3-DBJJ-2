package dto.type;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public enum AnomalyLevel {

    NORMAL("NORMAL", "Normal Level"),
    LOW("LOW", "Low Anomaly Level"),
    MEDIUM("MEDIUM", "Medium Anomaly Level"),
    HIGH("HIGH", "High Anomaly Level"),
    ;

    private final String level;
    private final String description;
}
