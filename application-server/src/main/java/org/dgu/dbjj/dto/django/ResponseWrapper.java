package org.dgu.dbjj.dto.django;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ResponseWrapper<T> {
    @JsonProperty("success")
    private boolean success;

    @JsonProperty("data")
    private T data;
}
