package com.booktrack.controller;

import com.booktrack.model.Author;
import com.booktrack.model.Book;
import com.booktrack.model.Category;
import com.booktrack.repository.AuthorRepository;
import com.booktrack.repository.BookRepository;
import com.booktrack.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class BookControllerIntegrationTest {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Author author;
    private Category category;

    @BeforeEach
    void setUp() {
        bookRepository.deleteAll();
        authorRepository.deleteAll();
        categoryRepository.deleteAll();

        author = Author.builder()
                .name("J.K. Rowling")
                .birthDate(LocalDate.of(1965, 7, 31))
                .biography("British author")
                .build();

        category = Category.builder()
                .name("Fantasy")
                .description("Fantasy books")
                .build();

        author = authorRepository.save(author);
        category = categoryRepository.save(category);
    }

    @Test
    void shouldCreateBookInDatabase() {
        Book book = Book.builder()
                .title("Harry Potter")
                .isbn("123456789")
                .publicationDate(LocalDate.of(1997, 6, 26))
                .description("Fantasy novel")
                .author(author)
                .category(category)
                .build();

        Book savedBook = bookRepository.save(book);

        assertNotNull(savedBook.getId());
        assertEquals("Harry Potter", savedBook.getTitle());
        assertEquals(author.getId(), savedBook.getAuthor().getId());
        assertEquals(category.getId(), savedBook.getCategory().getId());
    }

    @Test
    void shouldReadBookFromDatabase() {
        Book book = Book.builder()
                .title("Clean Code")
                .isbn("9780132350884")
                .publicationDate(LocalDate.of(2008, 8, 1))
                .description("Programming book")
                .author(author)
                .category(category)
                .build();

        Book savedBook = bookRepository.save(book);

        Book foundBook = bookRepository.findById(savedBook.getId()).orElseThrow();

        assertEquals("Clean Code", foundBook.getTitle());
        assertEquals("9780132350884", foundBook.getIsbn());
    }

    @Test
    void shouldDeleteBookFromDatabase() {
        Book book = Book.builder()
                .title("Book to delete")
                .isbn("111222333")
                .publicationDate(LocalDate.of(2020, 1, 1))
                .description("Temporary book")
                .author(author)
                .category(category)
                .build();

        Book savedBook = bookRepository.save(book);

        bookRepository.delete(savedBook);

        assertFalse(bookRepository.findById(savedBook.getId()).isPresent());
    }
}