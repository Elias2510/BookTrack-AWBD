package com.booktrack.controller;

import com.booktrack.dto.AuthorRequest;
import com.booktrack.model.Author;
import com.booktrack.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authors")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;

    @GetMapping
    public Page<Author> getAll(Pageable pageable) {
        return authorService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Author getById(@PathVariable Long id) {
        return authorService.findById(id);
    }

    @PostMapping
    public Author create(@Valid @RequestBody AuthorRequest request) {
        Author author = Author.builder()
                .name(request.getName())
                .biography(request.getBiography())
                .build();

        return authorService.create(author);
    }

    @PutMapping("/{id}")
    public Author update(@PathVariable Long id, @Valid @RequestBody AuthorRequest request) {
        Author author = Author.builder()
                .name(request.getName())
                .biography(request.getBiography())
                .build();

        return authorService.update(id, author);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        authorService.delete(id);
    }
}