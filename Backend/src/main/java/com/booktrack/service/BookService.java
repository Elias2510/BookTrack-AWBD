package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Author;
import com.booktrack.model.Book;
import com.booktrack.model.Category;
import com.booktrack.repository.AuthorRepository;
import com.booktrack.repository.BookRepository;
import com.booktrack.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;

    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public Book findById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cartea nu a fost găsită."));
    }

    public Book create(Book book, Long authorId, Long categoryId) {
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("Autorul nu a fost găsit."));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria nu a fost găsită."));

        book.setAuthor(author);
        book.setCategory(category);

        return bookRepository.save(book);
    }

    public Book update(Long id, Book bookDetails, Long authorId, Long categoryId) {
        Book book = findById(id);

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new ResourceNotFoundException("Autorul nu a fost găsit."));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria nu a fost găsită."));

        book.setTitle(bookDetails.getTitle());
        book.setIsbn(bookDetails.getIsbn());
        book.setPublicationDate(bookDetails.getPublicationDate());
        book.setDescription(bookDetails.getDescription());
        book.setAuthor(author);
        book.setCategory(category);

        return bookRepository.save(book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        bookRepository.delete(book);
    }
}