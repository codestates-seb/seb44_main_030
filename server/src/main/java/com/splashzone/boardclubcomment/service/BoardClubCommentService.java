package com.splashzone.boardclubcomment.service;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.service.BoardClubService;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardclubcomment.repository.BoardClubCommentRepository;
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

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardClubCommentService {
    private final MemberService memberService;
    private final BoardClubService boardClubService;
    private final BoardClubCommentRepository boardClubCommentRepository;

    public BoardClubComment createBoardClubComment(BoardClubComment boardClubComment) {
        Member findMember = memberService.findVerifiedMember(boardClubComment.getMember().getMemberId());
        BoardClub findBoardClub = boardClubService.findVerifiedBoardClub(boardClubComment.getBoardClub().getBoardClubId());

        BoardClubComment reBuildBoardClubComment = BoardClubComment.builder()
                .content(boardClubComment.getContent())
                .member(findMember)
                .boardClub(findBoardClub)
                .build();

        findMember.getBoardClubComments().add(reBuildBoardClubComment);
        findBoardClub.getBoardClubComments().add(reBuildBoardClubComment);

        return boardClubCommentRepository.save(reBuildBoardClubComment);
    }

    public BoardClubComment updateBoardClubComment(BoardClubComment boardClubComment) {
        BoardClubComment findBoardClubComment = findVerifiedBoardClubComment(boardClubComment.getBoardClubCommentId());

        findBoardClubComment.changeContent(boardClubComment.getContent());

        return boardClubCommentRepository.save(findBoardClubComment);
    }

    @Transactional(readOnly = true)
    public BoardClubComment findBoardClubComment(Long boardClubCommentId) {
        return findVerifiedBoardClubComment(boardClubCommentId);
    }

    /*
    public Page<BoardClubComment> findBoardClubComments(Integer page, Integer size) {
        return boardClubCommentRepository.findAll(PageRequest.of(page, size, Sort.by("boardClubCommentId")));
    }
     */

    public List<BoardClubComment> findBoardClubComments(Long boardClubId) {
        BoardClub findBoardClub = boardClubService.findVerifiedBoardClub(boardClubId);
        return findAllCommentsByBoardClub(findBoardClub);
    }

    public List<BoardClubComment> findAllCommentsByBoardClub(BoardClub boardClub) {
        return boardClubCommentRepository.findAllBoardClubCommentsByBoardClub(boardClub);
    }

    public void deleteBoardClubComment(Long boardClubCommentId) {
        BoardClubComment findBoardClubComment = findVerifiedBoardClubComment(boardClubCommentId);

        boardClubCommentRepository.delete(findBoardClubComment);
    }

    public BoardClubComment findVerifiedBoardClubComment(Long boardClubCommentId) {
        Optional<BoardClubComment> optionalBoardClubComment = boardClubCommentRepository.findById(boardClubCommentId);

        BoardClubComment findBoardClubComment =
                optionalBoardClubComment.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

        return findBoardClubComment;
    }
}
