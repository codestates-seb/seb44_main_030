package com.splashzone.boardstandardcomment.service;

import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.service.BoardStandardService;
import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.boardstandardcomment.repository.BoardStandardCommentRepository;
import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardStandardCommentService {
    private final MemberService memberService;
    private final BoardStandardService boardStandardService;
    private final BoardStandardCommentRepository boardStandardCommentRepository;

    public BoardStandardComment createBoardStandardComment(BoardStandardComment boardStandardComment) {
        Member findMember = memberService.findVerifiedMember(boardStandardComment.getMember().getMemberId());
        BoardStandard findBoardStandard = boardStandardService.findVerifiedBoardStandard(boardStandardComment.getBoardStandard().getBoardStandardId());

        BoardStandardComment reBuildBoardStandardComment = BoardStandardComment.builder()
                .content(boardStandardComment.getContent())
                .member(findMember)
                .boardStandard(findBoardStandard)
                .build();

        findMember.getBoardStandardComments().add(reBuildBoardStandardComment);
        findBoardStandard.getBoardStandardComments().add(reBuildBoardStandardComment);

        return boardStandardCommentRepository.save(reBuildBoardStandardComment);
    }

    public BoardStandardComment updateBoardStandardComment(BoardStandardComment boardStandardComment) {
        BoardStandardComment findBoardStandardComment = findVerifiedBoardStandardComment(boardStandardComment.getBoardStandardCommentId());

        findBoardStandardComment.changeContent(boardStandardComment.getContent());

        return boardStandardCommentRepository.save(findBoardStandardComment);
    }

    @Transactional(readOnly = true)
    public BoardStandardComment findBoardStandardComment(Long boardStandardCommentId) {
        return findVerifiedBoardStandardComment(boardStandardCommentId);
    }

    public Page<BoardStandardComment> findBoardStandardComments(Integer page, Integer size) {
        return boardStandardCommentRepository.findAll(PageRequest.of(page, size, Sort.by("boardStandardCommentId")));
    }

    public void deleteBoardStandardComment(Long boardStandardCommentId) {
        BoardStandardComment findBoardStandardComment = findVerifiedBoardStandardComment(boardStandardCommentId);

        boardStandardCommentRepository.delete(findBoardStandardComment);
    }

    public BoardStandardComment findVerifiedBoardStandardComment(Long boardStandardCommentId) {
        Optional<BoardStandardComment> optionalBoardStandardComment = boardStandardCommentRepository.findById(boardStandardCommentId);

        BoardStandardComment findBoardStandardComment =
                optionalBoardStandardComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findBoardStandardComment;
    }
}
