package com.splashzone.boardstandard.service;

import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.entity.BoardStandardLike;
import com.splashzone.boardstandard.entity.BoardStandardTag;
import com.splashzone.boardstandard.mapper.BoardStandardMapper;
import com.splashzone.boardstandard.repository.BoardStandardLikeRepository;
import com.splashzone.boardstandard.repository.BoardStandardRepository;
import com.splashzone.boardstandard.repository.BoardStandardTagRepository;
import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import com.splashzone.tag.entity.Tag;
import com.splashzone.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardStandardService {
    private static final String SUCCESS_LIKE_BOARD_STANDARD = "좋아요 처리 완료";
    private static final String SUCCESS_UNLIKE_BOARD_STANDARD = "좋아요 취소 완료";
    private final MemberService memberService;
    private final BoardStandardRepository boardStandardRepository;
    private final BoardStandardTagRepository boardStandardTagRepository;
    private final BoardStandardLikeRepository boardStandardLikeRepository;
    private final TagService tagService;

    public BoardStandard createBoardStandard(BoardStandard boardStandard) {
        Member findMember = memberService.findVerifiedMember(boardStandard.getMember().getMemberId());

        BoardStandard postBoardStandard = BoardStandard.builder()
                .title(boardStandard.getTitle())
                .content(boardStandard.getContent())
                .member(findMember)
                .build();

        findMember.getBoardStandards().add(postBoardStandard);

        bridgeTagToBoardStandard(boardStandard, postBoardStandard);

        return boardStandardRepository.save(postBoardStandard);
    }

    public BoardStandard updateBoardStandard(BoardStandard boardStandard) {
        BoardStandard findBoardStandard = findVerifiedBoardStandard(boardStandard.getBoardStandardId());

        List<BoardStandardTag> standardTags = boardStandard.getBoardStandardTags().stream()
                        .map(boardStandardTag -> {
                            Tag dbTag = tagService.findVerifiedTagByTagName(boardStandardTag.getTag().getTagName());
                            return BoardStandardTag.builder()
                                    .boardStandard(findBoardStandard)
                                    .tag(dbTag).build();
                        })
                        .collect(Collectors.toList());

        findBoardStandard.changeBoardStandard(boardStandard, standardTags);

        return boardStandardRepository.save(findBoardStandard);
    }

    @Transactional(readOnly = true)
    public BoardStandard findBoardStandard(Long boardStandardId) {
        return findVerifiedBoardStandard(boardStandardId);
    }

    @Transactional(readOnly = true)
    public Page<BoardStandard> findBoardStandards(Integer page, Integer size) {
        return boardStandardRepository.findByBoardStandard(PageRequest.of(page, size, Sort.by("boardStandardId").descending()));
    }

    public void deleteBoardStandard(Long boardStandardId) {
        BoardStandard findBoardStandard = findVerifiedBoardStandard(boardStandardId);

        boardStandardRepository.delete(findBoardStandard);
    }

    public BoardStandard findVerifiedBoardStandard(Long boardStandardId) {
        Optional<BoardStandard> optionalBoardStandard = boardStandardRepository.findById(boardStandardId);

        BoardStandard findBoardStandard =
                optionalBoardStandard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_STANDARD_NOT_FOUND));

        return findBoardStandard;
    }

    private void bridgeTagToBoardStandard(BoardStandard boardStandard, BoardStandard postBoardStandard) {
        boardStandard.getBoardStandardTags().stream()
                .forEach(boardStandardTag -> {
                    Tag dbTag = tagService.findVerifiedTagByTagName(boardStandardTag.getTag().getTagName());
                    BoardStandardTag reBuildBoardStandardTag =
                            BoardStandardTag.builder()
                                    .boardStandard(postBoardStandard)
                                    .tag(dbTag).build();
                    boardStandardTagRepository.save(reBuildBoardStandardTag);
                });
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