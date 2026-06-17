package com.booktrack.service;

import com.booktrack.exception.ResourceNotFoundException;
import com.booktrack.model.Book;
import com.booktrack.model.ReadingList;
import com.booktrack.model.User;
import com.booktrack.repository.BookRepository;
import com.booktrack.repository.ReadingListRepository;
import com.booktrack.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReadingListService {

    private final ReadingListRepository readingListRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public Page<ReadingList> findAll(Pageable pageable) {
        return readingListRepository.findAll(pageable);
    }

    public ReadingList findById(Long id) {
        return readingListRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lista de lectură nu a fost găsită."));
    }

    public ReadingList create(ReadingList readingList, Long userId, List<Long> bookIds) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilizatorul nu a fost găsit."));

        List<Book> books = new ArrayList<>();

        if (bookIds != null) {
            books = bookRepository.findAllById(bookIds);
        }

        readingList.setUser(user);
        readingList.setBooks(books);

        return readingListRepository.save(readingList);
    }

    public ReadingList update(Long id, ReadingList details, Long userId, List<Long> bookIds) {
        ReadingList readingList = findById(id);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Utilizatorul nu a fost găsit."));

        List<Book> books = new ArrayList<>();

        if (bookIds != null) {
            books = bookRepository.findAllById(bookIds);
        }

        readingList.setName(details.getName());
        readingList.setUser(user);
        readingList.setBooks(books);

        return readingListRepository.save(readingList);
    }

    public void delete(Long id) {
        ReadingList readingList = findById(id);
        readingListRepository.delete(readingList);
    }
}