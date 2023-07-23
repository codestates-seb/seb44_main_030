package com.splashzone.boardstandard.service;

import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.entity.BoardStandardLike;
import com.splashzone.boardstandard.mapper.BoardStandardMapper;
import com.splashzone.boardstandard.repository.BoardStandardLikeRepository;
import com.splashzone.boardstandard.repository.BoardStandardRepository;
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
@RequiredArgsConstructor
@Transactional
public class BoardStandardService {
    private static final String SUCCESS_LIKE_BOARD_STANDARD = "좋아요 처리 완료";
    private static final String SUCCESS_UNLIKE_BOARD_STANDARD = "좋아요 취소 완료";
    private final BoardStandardMapper boardStandardMapper;
    private final BoardStandardRepository boardStandardRepository;
    private final BoardStandardLikeRepository boardStandardLikeRepository;
    private final MemberService memberService;

    public BoardStandard createStandard(BoardStandard boardStandard) {
        Member member = memberService.findMember(boardStandard.getMember().getMemberId());
        BoardStandard reBuildBoardStandard = BoardStandard.builder()
                .title(boardStandard.getTitle())
                .content(boardStandard.getContent())
                .member(member)
                .build();

        member.getBoardStandards().add(reBuildBoardStandard);

        return boardStandardRepository.save(reBuildBoardStandard);
    }

    public BoardStandard updateStandard(BoardStandard boardStandard) {
        BoardStandard findBoardStandard = findVerifiedBoardStandard(boardStandard.getBoardStandardId());
        findBoardStandard.changeBoardStandard(boardStandard);
        return boardStandardRepository.save(findBoardStandard);
    }

    public BoardStandard findStandard(Long boardStandardId) {
        return findVerifiedBoardStandard(boardStandardId);
    }

    public Page<BoardStandard> findStandards(Integer page, Integer size) {
        return boardStandardRepository.findByBoardStandard(PageRequest.of(page, size, Sort.by("boardStandardId").descending()));
    }

    //TODO 실제 삭제 말고 상태만 바뀌게 코드 변경하기
    public void deleteStandard(Long boardStandardId) {
        BoardStandard boardStandard = boardStandardRepository.findById(boardStandardId).orElseThrow(() -> new RuntimeException());
        boardStandardRepository.delete(boardStandard);
    }

    public BoardStandard findVerifiedBoardStandard(Long boardStandardId) {
        Optional<BoardStandard> optionalBoardStandard = boardStandardRepository.findById(boardStandardId);

        BoardStandard findBoardStandard =
                optionalBoardStandard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_STANDARD_NOT_FOUND));

        return findBoardStandard;
    }

    //조회수 증가
    public int updateViews(Long boardStandardId) {
        return boardStandardRepository.updateViews(boardStandardId);
    }

    public String updateLikeOfBoardStandard(Long boardStandardId, Long memberId) {
        BoardStandard findBoardStandard = findVerifiedBoardStandard(boardStandardId);

        Member findMember = memberService.findVerifiedMember(memberId);

        if (!hasBoardStandardLike(findBoardStandard, findMember)) {
            findBoardStandard.increaseLikeCount();
            return createBoardStandardLike(findBoardStandard, findMember);
        }

        findBoardStandard.decreaseLikeCount();
        return removeBoardStandardLike(findBoardStandard, findMember);
    }

    public String createBoardStandardLike(BoardStandard boardStandard, Member member) {
        BoardStandardLike boardStandardLike = new BoardStandardLike(boardStandard, member);
        boardStandardLikeRepository.save(boardStandardLike);
        return SUCCESS_LIKE_BOARD_STANDARD;
    }

    public String removeBoardStandardLike(BoardStandard boardStandard, Member member) {
        BoardStandardLike boardStandardLike = boardStandardLikeRepository.findByBoardStandardAndMember(boardStandard, member)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));

        boardStandardLikeRepository.delete(boardStandardLike);

        return SUCCESS_UNLIKE_BOARD_STANDARD;
    }

    public boolean hasBoardStandardLike(BoardStandard boardStandard, Member member) {
        return boardStandardLikeRepository.findByBoardStandardAndMember(boardStandard, member)
                .isPresent();
    }

    //총 질문 수 카운트
    public Long getTotalBoardStandardCount() {
        return boardStandardRepository.count();
    }

}