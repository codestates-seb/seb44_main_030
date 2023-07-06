package com.splashzone.boardclub.service;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.entity.BoardClubTag;
import com.splashzone.boardclub.repository.BoardClubRepository;
import com.splashzone.boardclub.repository.BoardClubTagRepository;
import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
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
        memberService.findVerifiedMember(boardClub.getMember().getMemberId());

        BoardClub savedBoardClub = boardClubRepository.save(boardClub);

        // score 증가 로직 추가 예정

        return savedBoardClub;
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

        modifyTagInBoardClub(boardClub, findBoardClub);

        return boardClubRepository.save(findBoardClub);
    }

    @Transactional(readOnly = true)
    public BoardClub findBoardClub(long boardClubId) {
        return findVerifiedBoardClub(boardClubId); // 댓글 조회 추가 예정
    }

    public Page<BoardClub> findBoardClubs(int page, int size) {
        return boardClubRepository.findAll(PageRequest.of(page, size, Sort.by("boardClubId").descending()));
    }

    public void deleteBoardClub(long boardClubId) {
        BoardClub findBoardClub = findVerifiedBoardClub(boardClubId);

        if (findBoardClub.getBoardClubStatus() == BoardClub.BoardClubStatus.BOARD_CLUB_RECRUITING) {
            findBoardClub.changeBoardClubStatus(BoardClub.BoardClubStatus.BOARD_CLUB_CANCEL);
        }

        boardClubRepository.delete(findBoardClub);
    }

    private BoardClub findVerifiedBoardClub(long boardClubId) {
        Optional<BoardClub> optionalBoardClub = boardClubRepository.findById(boardClubId);

        BoardClub findBoardClub =
                optionalBoardClub.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_CLUB_NOT_FOUND));

        return findBoardClub;
    }

    // 태그 삭제 메서드 추가 가능
    private void modifyTagInBoardClub(BoardClub boardClub, BoardClub modifiedBoardClub) {
        boardClub.getBoardClubTags().stream() // 모임게시판에서 모임게시판 태그를 가져온다.
                .forEach(boardClubTag -> {
                    Tag dbTag = tagService.findVerifiedTagByTagName(boardClubTag.getTag().getTagName());
                    BoardClubTag modifiedBoardClubTag = // 수정된 모임게시판 태그
                            BoardClubTag.builder()
                                    .boardClub(modifiedBoardClub)
                                    .tag(dbTag).build();
                    boardClubTagRepository.save(modifiedBoardClubTag);
                });
    }

    public int updateViews(long boardClubId) {
        return boardClubRepository.updateViews(boardClubId);
    }
}