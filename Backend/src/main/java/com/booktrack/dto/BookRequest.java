package com.booktrack.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookRequest {

    @NotBlank(message = "Titlul este obligatoriu")
    private String title;

    private String isbn;

    private LocalDate publicationDate;

    private String description;

    @NotNull(message = "Autorul este obligatoriu")
    private Long authorId;

    @NotNull(message = "Categoria este obligatorie")
    private Long categoryId;
}