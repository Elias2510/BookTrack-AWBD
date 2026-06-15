package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Book;
import com.booktrack.model.Review;
import com.booktrack.model.User;
import com.booktrack.repository.BookRepository;
import com.booktrack.repository.ReviewRepository;
import com.booktrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public Review create(Long userId, Long bookId, Review review) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilizatorul nu a fost găsit."));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Cartea nu a fost găsită."));

        review.setUser(user);
        review.setBook(book);

        return reviewRepository.save(review);
    }

    public Review update(Long id, Review reviewDetails) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recenzia nu a fost găsită."));

        review.setRating(reviewDetails.getRating());
        review.setComment(reviewDetails.getComment());

        return reviewRepository.save(review);
    }

    public void delete(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recenzia nu a fost găsită."));

        reviewRepository.delete(review);
    }
}