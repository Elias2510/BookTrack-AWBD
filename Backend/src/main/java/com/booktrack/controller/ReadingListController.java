package com.booktrack.controller;

import com.booktrack.dto.ReadingListRequest;
import com.booktrack.model.ReadingList;
import com.booktrack.service.ReadingListService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reading-lists")
@RequiredArgsConstructor
public class ReadingListController {

    private final ReadingListService readingListService;

    @GetMapping
    public Page<ReadingList> getAll(Pageable pageable) {
        return readingListService.findAll(pageable);
    }

    @GetMapping("/{id}")
    public ReadingList getById(@PathVariable Long id) {
        return readingListService.findById(id);
    }

    @PostMapping
    public ReadingList create(@Valid @RequestBody ReadingListRequest request) {
        ReadingList readingList = ReadingList.builder()
                .name(request.getName())
                .build();

        return readingListService.create(
                readingList,
                request.getUserId(),
                request.getBookIds()
        );
    }

    @PutMapping("/{id}")
    public ReadingList update(@PathVariable Long id, @Valid @RequestBody ReadingListRequest request) {
        ReadingList readingList = ReadingList.builder()
                .name(request.getName())
                .build();

        return readingListService.update(
                id,
                readingList,
                request.getUserId(),
                request.getBookIds()
        );
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        readingListService.delete(id);
    }
}