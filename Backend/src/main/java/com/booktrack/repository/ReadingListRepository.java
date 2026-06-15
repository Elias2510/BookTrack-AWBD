package com.booktrack.repository;

import com.booktrack.model.ReadingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingListRepository extends JpaRepository<ReadingList, Long> {
}