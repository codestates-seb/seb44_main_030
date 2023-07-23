package com.splashzone.boardstandard.repository;

import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BoardStandardRepository extends JpaRepository<BoardStandard, Long> {
    @Query("SELECT b from BoardStandard b")
    Page<BoardStandard> findByBoardStandard(Pageable pageable);

    @Modifying
    @Query("UPDATE BoardStandard c SET c.view = c.view + 1 WHERE c.boardStandardId = :boardStandardId")
    int updateViews(Long boardStandardId);

    Page<BoardStandard> findByLikeCountGreaterThanEqual(Pageable pageable, int number);

    Page<BoardStandard> findByMember(Member member, Pageable pageable);
}