package com.splashzone.boardclubcomment.repository;

import com.splashzone.boardclubcomment.entity.BoardClubComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardClubCommentRepository extends JpaRepository<BoardClubComment, Long> {
}
