package com.splashzone.boardstandardcomment.repository;

import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardStandardCommentRepository extends JpaRepository<BoardStandardComment, Long> {
}
