package com.splashzone.boardstandard.repository;

import com.splashzone.boardstandard.entity.BoardStandard;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardStandardRepository extends JpaRepository<BoardStandard, Long> {
    @Query("SELECT b from BoardStandard b")
    Page<BoardStandard> findByBoardStandard(Pageable pageable);
}
