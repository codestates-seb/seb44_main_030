package com.splashzone.boardstandardcomment.repository;

import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardStandardCommentRepository extends JpaRepository<BoardStandardComment, Long> {
    Page<BoardStandardComment> findByMember(Member member, Pageable pageable);
}
