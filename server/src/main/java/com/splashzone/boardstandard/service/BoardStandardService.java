package com.splashzone.boardstandard.service;

import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.mapper.BoardStandardMapper;
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
    private final BoardStandardMapper boardStandardMapper;
    private final BoardStandardRepository boardStandardRepository;
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

//        BoardStandard boardStandard = boardStandardMapper.postDtoToBoardStandard(postDto);
//        boardStandard.setMember(member);
//        boardStandardRepository.save(boardStandard);
//        return boardStandard;
    }

    public BoardStandard updateStandard(BoardStandard boardStandard) {
        BoardStandard findBoardStandard = findVerifiedBoardStandard(boardStandard.getStandardId());
        findBoardStandard.changeBoardStandard(boardStandard);
        return boardStandardRepository.save(findBoardStandard);
    }

    public BoardStandard selectStandard(Long standardId) {
        BoardStandard boardStandard = boardStandardRepository.findById(standardId).orElseThrow(() -> new RuntimeException());
        //뷰수 추가
        boardStandard.setView(boardStandard.getView() + 1);
        boardStandardRepository.save(boardStandard);
        return boardStandard;
    }

    public Page<BoardStandard> findStandards(int page, int size) {
        return boardStandardRepository.findByBoardStandard(PageRequest.of(page, size, Sort.by("standardId").descending()));
    }

    //TODO 실제 삭제 말고 상태만 바뀌게 코드 변경하기
    public void deleteStandard(Long standardId) {
        BoardStandard boardStandard = boardStandardRepository.findById(standardId).orElseThrow(() -> new RuntimeException());
        boardStandardRepository.delete(boardStandard);
//        BoardStandard findBoardStandard = findVerifiedBoardStandard(standardId);
//        boardStandardRepository.delete(findBoardStandard);
    }

    //회원이 존재하는지 확인
    private void verifyBoardStandard(BoardStandard boardStandard) {
        memberService.findMember(boardStandard.getMember().getMemberId());
    }

    //조회수 증가
    public int increaseViews(Long standardId) {
        return boardStandardRepository.updateViews(standardId);
    }

    public BoardStandard findVerifiedBoardStandard(Long standardId) {
        Optional<BoardStandard> optionalBoardStandard = boardStandardRepository.findById(standardId);
        BoardStandard findBoardStandard = optionalBoardStandard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BOARD_STANDARD_NOT_FOUND));
        return findBoardStandard;
    }

    //총 질문 수 카운트
    public Long getTotalBoardStandardCount() {
        return boardStandardRepository.count();
    }

}
