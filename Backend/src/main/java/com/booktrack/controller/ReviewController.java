package com.booktrack.controller;

import com.booktrack.dto.ReviewRequest;
import com.booktrack.model.Review;
import com.booktrack.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public Review create(@Valid @RequestBody ReviewRequest request) {
        Review review = Review.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return reviewService.create(
                request.getUserId(),
                request.getBookId(),
                review
        );
    }

    @PutMapping("/{id}")
    public Review update(
            @PathVariable Long id,
            @Valid @RequestBody ReviewRequest request
    ) {
        Review review = Review.builder()
                .rating(request.getRating())
                .comment(request.getComment())
                .build();

        return reviewService.update(id, review);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        reviewService.delete(id);
    }
}