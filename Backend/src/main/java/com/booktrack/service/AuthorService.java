package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Author;
import com.booktrack.repository.AuthorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorService {

    private final AuthorRepository authorRepository;

    public Page<Author> findAll(Pageable pageable) {
        return authorRepository.findAll(pageable);
    }

    public Author findById(Long id) {
        return authorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Autorul nu a fost găsit."));
    }

    public Author create(Author author) {
        return authorRepository.save(author);
    }

    public Author update(Long id, Author authorDetails) {
        Author author = findById(id);
        author.setName(authorDetails.getName());
        author.setBirthDate(authorDetails.getBirthDate());
        author.setBiography(authorDetails.getBiography());
        return authorRepository.save(author);
    }

    public void delete(Long id) {
        Author author = findById(id);
        authorRepository.delete(author);
    }
}