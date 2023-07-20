package com.splashzone.boardclub.repository;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.entity.BoardClubLike;
import com.splashzone.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardClubLikeRepository extends JpaRepository<BoardClubLike, Long> {
    Optional<BoardClubLike> findByBoardClubAndMember(BoardClub boardClub, Member member);
}
