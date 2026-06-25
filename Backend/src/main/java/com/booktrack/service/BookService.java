package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Author;
import com.booktrack.model.Book;
import com.booktrack.model.Category;
import com.booktrack.repository.AuthorRepository;
import com.booktrack.repository.BookRepository;
import com.booktrack.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final CategoryRepository categoryRepository;

    public Page<Book> findAll(Pageable pageable) {
        log.info("Fetching paginated books");
        log.debug("Pageable details: {}", pageable);

        Page<Book> books = bookRepository.findAll(pageable);

        log.info("Fetched {} books from page {}",
                books.getNumberOfElements(),
                books.getNumber());

        return books;
    }

    public Book findById(Long id) {
        log.info("Fetching book with id: {}", id);

        return bookRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Book not found with id: {}", id);
                    return new ResourceNotFoundException("Cartea nu a fost găsită.");
                });
    }

    public Book create(Book book, Long authorId, Long categoryId) {
        log.info("Creating book with title: {}", book.getTitle());
        log.debug("Author id: {}, Category id: {}", authorId, categoryId);

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> {
                    log.error("Cannot create book. Author not found with id: {}", authorId);
                    return new ResourceNotFoundException("Autorul nu a fost găsit.");
                });

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> {
                    log.error("Cannot create book. Category not found with id: {}", categoryId);
                    return new ResourceNotFoundException("Categoria nu a fost găsită.");
                });

        book.setAuthor(author);
        book.setCategory(category);

        Book savedBook = bookRepository.save(book);

        log.info("Book created successfully with id: {}", savedBook.getId());

        return savedBook;
    }

    public Book update(Long id, Book bookDetails, Long authorId, Long categoryId) {
        log.info("Updating book with id: {}", id);
        log.debug("New author id: {}, New category id: {}", authorId, categoryId);

        Book existingBook = findById(id);

        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> {
                    log.error("Cannot update book. Author not found with id: {}", authorId);
                    return new ResourceNotFoundException("Autorul nu a fost găsit.");
                });

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> {
                    log.error("Cannot update book. Category not found with id: {}", categoryId);
                    return new ResourceNotFoundException("Categoria nu a fost găsită.");
                });

        existingBook.setTitle(bookDetails.getTitle());
        existingBook.setIsbn(bookDetails.getIsbn());
        existingBook.setPublicationDate(bookDetails.getPublicationDate());
        existingBook.setDescription(bookDetails.getDescription());
        existingBook.setAuthor(author);
        existingBook.setCategory(category);

        Book updatedBook = bookRepository.save(existingBook);

        log.info("Book updated successfully with id: {}", updatedBook.getId());

        return updatedBook;
    }

    public void delete(Long id) {
        log.info("Deleting book with id: {}", id);

        Book book = findById(id);

        bookRepository.delete(book);

        log.info("Book deleted successfully with id: {}", id);
    }
}