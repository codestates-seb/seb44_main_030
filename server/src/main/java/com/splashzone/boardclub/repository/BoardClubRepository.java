package com.splashzone.boardclub.repository;

import com.splashzone.boardclub.entity.BoardClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface BoardClubRepository extends JpaRepository<BoardClub, Long> {
    @Modifying
    @Query("UPDATE BoardClub c SET c.view = c.view + 1 WHERE c.boardClubId = :boardClubId")
    int updateViews(long boardClubId);
}