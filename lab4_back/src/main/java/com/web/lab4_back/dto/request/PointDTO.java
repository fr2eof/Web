package com.web.lab4_back.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class PointDTO {
    @NotNull(message = "User ID cannot be null")
    private Long userId;

    @NotNull(message = "X cannot be null")
    @Min(value = -5, message = "X must be greater than or equal to -5")
    @Max(value = 3, message = "X must be less than or equal to 5")
    private Double x;

    @NotNull(message = "Y cannot be null")
    @Min(value = -5, message = "Y must be greater than or equal to -5")
    @Max(value = 3, message = "Y must be less than or equal to 5")
    private Double y;

    @NotNull(message = "R cannot be null")
    @Positive(message = "R must be greater than 0")
    @Max(value = 3, message = "R must be less than or equal to 3")
    private Double r;

    private boolean inArea;
}