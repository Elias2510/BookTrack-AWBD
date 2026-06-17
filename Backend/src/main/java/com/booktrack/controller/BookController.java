package com.booktrack.controller;

import com.booktrack.dto.BookRequest;
import com.booktrack.model.Book;
import com.booktrack.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public Page<Book> getAllBooks(Pageable pageable) {
        return bookService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @PostMapping
    public Book createBook(@Valid @RequestBody BookRequest request) {
        Book book = Book.builder()
                .title(request.getTitle())
                .isbn(request.getIsbn())
                .publicationDate(request.getPublicationDate())
                .description(request.getDescription())
                .build();

        return bookService.create(book, request.getAuthorId(), request.getCategoryId());
    }

    @PutMapping("/{id}")
    public Book updateBook(
            @PathVariable Long id,
            @Valid @RequestBody BookRequest request
    ) {
        Book book = Book.builder()
                .title(request.getTitle())
                .isbn(request.getIsbn())
                .publicationDate(request.getPublicationDate())
                .description(request.getDescription())
                .build();

        return bookService.update(id, book, request.getAuthorId(), request.getCategoryId());
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.delete(id);
    }
}