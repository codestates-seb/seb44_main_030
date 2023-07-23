package com.splashzone.boardstandard.repository;

import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.entity.BoardStandardLike;
import com.splashzone.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardStandardLikeRepository extends JpaRepository<BoardStandardLike, Long> {
    Optional<BoardStandardLike> findByBoardStandardAndMember(BoardStandard boardStandard, Member member);
}
