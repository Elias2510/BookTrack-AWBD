package com.booktrack.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserProfileRequest {
    private String favoriteGenre;
    private String bio;

    @NotNull
    private Long userId;
}