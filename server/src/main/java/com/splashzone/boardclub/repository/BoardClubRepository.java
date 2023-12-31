package com.splashzone.boardclub.repository;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface BoardClubRepository extends JpaRepository<BoardClub, Long> {
    @Modifying
    @Query("UPDATE BoardClub c SET c.view = c.view + 1 WHERE c.boardClubId = :boardClubId")
    int updateViews(Long boardClubId);

    Page<BoardClub> findByLikeCountGreaterThanEqual(Pageable pageable, int number);

    // memberId로 findByMember 방법 고려
    Page<BoardClub> findByMember(Member member, Pageable pageable);
}