package com.booktrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ReadingListRequest {
    @NotBlank
    private String name;

    @NotNull
    private Long userId;

    private List<Long> bookIds;
}