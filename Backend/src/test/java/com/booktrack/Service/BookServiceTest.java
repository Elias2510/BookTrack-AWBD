package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Author;
import com.booktrack.model.Book;
import com.booktrack.model.Category;
import com.booktrack.repository.AuthorRepository;
import com.booktrack.repository.BookRepository;
import com.booktrack.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private AuthorRepository authorRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private BookService bookService;

    @Test
    void findAll_shouldReturnPaginatedBooks() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");

        PageRequest pageable = PageRequest.of(0, 10);
        Page<Book> page = new PageImpl<>(List.of(book));

        when(bookRepository.findAll(pageable)).thenReturn(page);

        Page<Book> result = bookService.findAll(pageable);

        assertEquals(1, result.getTotalElements());
        assertEquals("Test Book", result.getContent().get(0).getTitle());
        verify(bookRepository).findAll(pageable);
    }

    @Test
    void findById_shouldReturnBook_whenBookExists() {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("BookTrack");

        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        Book result = bookService.findById(1L);

        assertEquals(1L, result.getId());
        assertEquals("BookTrack", result.getTitle());
        verify(bookRepository).findById(1L);
    }

    @Test
    void findById_shouldThrowException_whenBookDoesNotExist() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bookService.findById(99L));

        verify(bookRepository).findById(99L);
    }

    @Test
    void create_shouldSaveBookWithAuthorAndCategory() {
        Book book = new Book();
        book.setTitle("New Book");

        Author author = new Author();
        author.setId(1L);

        Category category = new Category();
        category.setId(1L);

        Book savedBook = new Book();
        savedBook.setId(1L);
        savedBook.setTitle("New Book");
        savedBook.setAuthor(author);
        savedBook.setCategory(category);

        when(authorRepository.findById(1L)).thenReturn(Optional.of(author));
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(bookRepository.save(book)).thenReturn(savedBook);

        Book result = bookService.create(book, 1L, 1L);

        assertEquals(1L, result.getId());
        assertEquals("New Book", result.getTitle());
        assertEquals(author, result.getAuthor());
        assertEquals(category, result.getCategory());

        verify(authorRepository).findById(1L);
        verify(categoryRepository).findById(1L);
        verify(bookRepository).save(book);
    }

    @Test
    void update_shouldModifyAndSaveBook() {
        Book existingBook = new Book();
        existingBook.setId(1L);
        existingBook.setTitle("Old Title");

        Book bookDetails = new Book();
        bookDetails.setTitle("Updated Title");
        bookDetails.setIsbn("123456");
        bookDetails.setDescription("Updated description");

        Author author = new Author();
        author.setId(1L);

        Category category = new Category();
        category.setId(1L);

        when(bookRepository.findById(1L)).thenReturn(Optional.of(existingBook));
        when(authorRepository.findById(1L)).thenReturn(Optional.of(author));
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(bookRepository.save(existingBook)).thenReturn(existingBook);

        Book result = bookService.update(1L, bookDetails, 1L, 1L);

        assertEquals("Updated Title", result.getTitle());
        assertEquals("123456", result.getIsbn());
        assertEquals("Updated description", result.getDescription());
        assertEquals(author, result.getAuthor());
        assertEquals(category, result.getCategory());

        verify(bookRepository).save(existingBook);
    }

    @Test
    void delete_shouldDeleteBook_whenBookExists() {
        Book book = new Book();
        book.setId(1L);

        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        bookService.delete(1L);

        verify(bookRepository).delete(book);
    }
}