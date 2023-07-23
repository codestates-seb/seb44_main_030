package com.splashzone.boardclubcomment.repository;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardClubCommentRepository extends JpaRepository<BoardClubComment, Long> {
    Page<BoardClubComment> findByMember(Member member, Pageable pageable);

    List<BoardClubComment> findAllBoardClubCommentsByBoardClub(BoardClub boardClub);
}
