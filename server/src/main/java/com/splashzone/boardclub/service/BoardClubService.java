package com.splashzone.boardclub.service;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.entity.BoardClubTag;
import com.splashzone.boardclub.repository.BoardClubRepository;
import com.splashzone.boardclub.repository.BoardClubTagRepository;
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

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardClubService {
    private final MemberService memberService;
    private final BoardClubRepository boardClubRepository;
    private final BoardClubTagRepository boardClubTagRepository;
    private final TagService tagService;

    public BoardClub createBoardClub(BoardClub boardClub) {
        Member findMember = memberService.findVerifiedMember(boardClub.getMember().getMemberId());

        BoardClub reBuildBoardClub = BoardClub.builder()
                .title(boardClub.getTitle())
                .content(boardClub.getContent())
                .dueDate(boardClub.getDueDate())
                .contact(boardClub.getContact())
                .member(findMember)
                .build();

        findMember.getBoardClubs().add(reBuildBoardClub);

        bridgeTagToBoardClub(boardClub, reBuildBoardClub);

        return boardClubRepository.save(reBuildBoardClub);

        // score 증가 로직 추가 예정
    }

    public BoardClub updateBoardClub(BoardClub boardClub) {
        BoardClub findBoardClub = findVerifiedBoardClub(boardClub.getBoardClubId());

        /*
        Optional.ofNullable(boardClub.getTitle())
                .ifPresent(title -> findBoardClub.setTitle(title));
        Optional.ofNullable(boardClub.getContent())
                .ifPresent(content -> findBoardClub.setContent(content));
        Optional.ofNullable(boardClub.getDueDate())
                .ifPresent(dueDate -> findBoardClub.setDueDate(dueDate));
        Optional.ofNullable(boardClub.getContact())
                .ifPresent(contact -> findBoardClub.setContact(contact));
        Optional.ofNullable(boardClub.getBoardClubStatus())
                .ifPresent(boardClubStatus -> findBoardClub.setBoardClubStatus(boardClubStatus));
         */

        findBoardClub.changeBoardClub(boardClub);

        deleteOriginTagInBoardClub(findBoardClub);
        bridgeTagToBoardClub(boardClub, findBoardClub);

        return boardClubRepository.save(findBoardClub);
    }

    @Transactional(readOnly = true)
    public BoardClub findBoardClub(Long boardClubId) {
        return findVerifiedBoardClub(boardClubId); // 댓글 조회 추가 예정
    }

    public Page<BoardClub> findBoardClubs(Integer page, Integer size) {
        return boardClubRepository.findAll(PageRequest.of(page, size, Sort.by("boardClubId").descending()));
    }

    public void deleteBoardClub(Long boardClubId) {
        BoardClub findBoardClub = findVerifiedBoardClub(boardClubId);

        if (findBoardClub.getBoardClubStatus() == BoardClub.BoardClubStatus.BOARD_CLUB_RECRUITING) {
            findBoardClub.changeBoardClubStatus(BoardClub.BoardClubStatus.BOARD_CLUB_CANCEL);
        }

        boardClubRepository.delete(findBoardClub);
    }

    private BoardClub findVerifiedBoardClub(Long boardClubId) {
        Optional<BoardClub> optionalBoardClub = boardClubRepository.findById(boardClubId);

        BoardClub findBoardClub =
                optionalBoardClub.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_CLUB_NOT_FOUND));

        return findBoardClub;
    }

    private void deleteOriginTagInBoardClub(BoardClub findBoardClub) {
        findBoardClub.getBoardClubTags().stream()
                .forEach(boardClubTag -> {
                    boardClubTag.removeTo(findBoardClub, boardClubTag.getTag());
                    boardClubTagRepository.delete(boardClubTag);
                });
    }

    private void bridgeTagToBoardClub(BoardClub boardClub, BoardClub reBuildBoardClub) {
        boardClub.getBoardClubTags().stream() // 수정한 모임게시글에서 태그를 가져온다.
                .forEach(boardClubTag -> {
                    Tag dbTag = tagService.findVerifiedTagByTagName(boardClubTag.getTag().getTagName()); // 수정한 모임게시글의 태그가 DB에 있는지 확인한다.
                    BoardClubTag reBuildBoardClubTag =
                            BoardClubTag.builder()
                                    .boardClub(reBuildBoardClub)
                                    .tag(dbTag).build(); // 수정한 모임게시글의 태그를 reBuildBoardClub에 저장한다.
                    boardClubTagRepository.save(reBuildBoardClubTag); // 태그를 repository에 저장한다.
                });
    }

    public int updateViews(Long boardClubId) {
        return boardClubRepository.updateViews(boardClubId);
    }
}