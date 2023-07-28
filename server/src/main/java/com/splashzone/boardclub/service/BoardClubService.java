package com.splashzone.boardclub.service;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.entity.BoardClubLike;
import com.splashzone.boardclub.entity.BoardClubTag;
import com.splashzone.boardclub.repository.BoardClubLikeRepository;
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
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardClubService {
    private static final String SUCCESS_LIKE_BOARD_CLUB = "좋아요 처리 완료";
    private static final String SUCCESS_UNLIKE_BOARD_CLUB = "좋아요 취소 완료";
    private final MemberService memberService;
    private final BoardClubRepository boardClubRepository;
    private final BoardClubTagRepository boardClubTagRepository;
    private final BoardClubLikeRepository boardClubLikeRepository;
    private final TagService tagService;

    public BoardClub createBoardClub(BoardClub boardClub) {
        Member findMember = memberService.findVerifiedMember(boardClub.getMember().getMemberId());

        BoardClub postBoardClub = BoardClub.builder()
                .title(boardClub.getTitle())
                .content(boardClub.getContent())
                .dueDate(boardClub.getDueDate())
                .capacity(boardClub.getCapacity())
                .contact(boardClub.getContact())
                .placeName(boardClub.getPlaceName())
                .addressName(boardClub.getAddressName())
                .latitude(boardClub.getLatitude())
                .longitude(boardClub.getLongitude())
                .member(findMember)
                .build();

        findMember.getBoardClubs().add(postBoardClub);

        bridgeTagToBoardClub(boardClub, postBoardClub);

        return boardClubRepository.save(postBoardClub);
    }

    public BoardClub updateBoardClub(BoardClub boardClub) {
        BoardClub findBoardClub = findVerifiedBoardClub(boardClub.getBoardClubId());

        List<BoardClubTag> clubTags = boardClub.getBoardClubTags().stream() // 수정한 모임게시글에서 태그를 가져온다.
                        .map(boardClubTag -> {
                            Tag dbTag = tagService.findVerifiedTagByTagName(boardClubTag.getTag().getTagName()); // 수정한 모임게시글의 태그가 DB에 있는지 확인한다.
                            return BoardClubTag.builder()
                                    .boardClub(findBoardClub)
                                    .tag(dbTag).build(); // 수정한 모임게시글의 태그를 저장한다.
                        })
                        .collect(Collectors.toList());

        findBoardClub.changeBoardClub(boardClub, clubTags);

        return boardClubRepository.save(findBoardClub);
    }

    @Transactional(readOnly = true)
    public BoardClub findBoardClub(Long boardClubId) {
        return findVerifiedBoardClub(boardClubId);
    }

    @Transactional(readOnly = true)
    public Page<BoardClub> findBoardClubs(Integer page, Integer size) {
        return boardClubRepository.findAll(PageRequest.of(page, size, Sort.by("boardClubId").descending()));
    }

    @Transactional(readOnly = true)
    public Page<BoardClub> searchBoardStandardsByKeyword(Integer page, Integer size, String keyword) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("boardClubId").descending());
        Page<BoardClub> pageBoardClubs = boardClubRepository.findAllSearch(keyword, pageRequest);

        return pageBoardClubs;
    }

    @Transactional(readOnly = true)
    public Page<BoardClub> searchBoardClubsBySpecificTag(Tag tag, Integer page, Integer size) {
        return boardClubRepository.findByBoardClubTagsTag(tag, PageRequest.of(page, size, Sort.by("boardClubId").descending()));
    }

    public void deleteBoardClub(Long boardClubId) {
        BoardClub findBoardClub = findVerifiedBoardClub(boardClubId);

        if (findBoardClub.getBoardClubStatus() == BoardClub.BoardClubStatus.BOARD_CLUB_RECRUITING) {
            findBoardClub.changeBoardClubStatus(BoardClub.BoardClubStatus.BOARD_CLUB_CANCEL);
        }

        boardClubRepository.delete(findBoardClub);
    }

    public BoardClub findVerifiedBoardClub(Long boardClubId) {
        Optional<BoardClub> optionalBoardClub = boardClubRepository.findById(boardClubId);

        BoardClub findBoardClub =
                optionalBoardClub.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_CLUB_NOT_FOUND));

        return findBoardClub;
    }

    private void bridgeTagToBoardClub(BoardClub boardClub, BoardClub postBoardClub) {
        boardClub.getBoardClubTags().stream()
                .forEach(boardClubTag -> {
                    Tag dbTag = tagService.findVerifiedTagByTagName(boardClubTag.getTag().getTagName());
                    BoardClubTag reBuildBoardClubTag =
                            BoardClubTag.builder()
                                    .boardClub(postBoardClub)
                                    .tag(dbTag).build();
                    boardClubTagRepository.save(reBuildBoardClubTag);
                });
    }

    public int updateViews(Long boardClubId) {
        return boardClubRepository.updateViews(boardClubId);
    }

    public String updateLikeOfBoardClub(Long boardClubId, Long memberId) {
        BoardClub findBoardClub = findVerifiedBoardClub(boardClubId);

        Member findMember = memberService.findVerifiedMember(memberId);

        if (!hasBoardClubLike(findBoardClub, findMember)) {
            findBoardClub.increaseLikeCount();
            return createBoardClubLike(findBoardClub, findMember);
        }

        findBoardClub.decreaseLikeCount();
        return removeBoardClubLike(findBoardClub, findMember);
    }

    public String createBoardClubLike(BoardClub boardClub, Member member) {
        BoardClubLike boardClubLike = new BoardClubLike(boardClub, member);
        boardClubLikeRepository.save(boardClubLike);
        return SUCCESS_LIKE_BOARD_CLUB;
    }

    public String removeBoardClubLike(BoardClub boardClub, Member member) {
        BoardClubLike boardClubLike = boardClubLikeRepository.findByBoardClubAndMember(boardClub, member)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND));

        boardClubLikeRepository.delete(boardClubLike);

        return SUCCESS_UNLIKE_BOARD_CLUB;
    }

    public boolean hasBoardClubLike(BoardClub boardClub, Member member) {
        return boardClubLikeRepository.findByBoardClubAndMember(boardClub, member)
                .isPresent();
    }
}