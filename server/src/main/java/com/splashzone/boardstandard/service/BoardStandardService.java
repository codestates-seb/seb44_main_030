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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardStandardService {
    private final BoardStandardMapper boardStandardMapper;
    private final BoardStandardRepository boardStandardRepository;
    private final MemberService memberService;

    public BoardStandard createStandard(BoardStandardDto.Post postDto, long memberId) {
        Member member = memberService.findMember(memberId);
        BoardStandard boardStandard = boardStandardMapper.postDtoToBoardStandard(postDto);
        boardStandard.setMember(member);
        boardStandardRepository.save(boardStandard);
        return boardStandard;
    }

    public BoardStandard updateStandard(BoardStandardDto.Patch patchDto) {
        BoardStandard fs = findVerifiedBoardStandard(patchDto.getStandardId());
//        Member member = memberService.findMember(memberId);
        fs.setTitle(patchDto.getTitle());
        fs.setContent(patchDto.getContent());
        boardStandardRepository.save(fs);
        return fs;
    }

    public BoardStandard selectStandard(long standardId) {
        BoardStandard boardStandard = boardStandardRepository.findById(standardId).orElseThrow(() -> new RuntimeException());
        //뷰수 추가
        boardStandard.setView(boardStandard.getView() + 1);
        boardStandardRepository.save(boardStandard);
        return boardStandard;
    }

    public Page<BoardStandard> findStandards(int page, int size) {
        return boardStandardRepository.findByBoardStandard(PageRequest.of(page, size, Sort.by("standardId").descending()));
    }

    public void deleteStandard(long standardId) {
        BoardStandard boardStandard = boardStandardRepository.findById(standardId).orElseThrow(() -> new RuntimeException());
        boardStandardRepository.save(boardStandard);
        //TODO: 삭제 이렇게하는거 맞는지 재확인
    }

    //회원이 존재하는지 확인
    private void verifyBoardStandard(BoardStandard boardStandard) {
        memberService.findMember(boardStandard.getMember().getMemberId());
    }

    //조회수 증가
    public void increaseViews(BoardStandard boardStandard) {
        boardStandard.setView(boardStandard.getView() + 1);
        boardStandardRepository.save(boardStandard);
    }

    public BoardStandard findVerifiedBoardStandard(long questionId) {
        Optional<BoardStandard> optionalQuestion = boardStandardRepository.findById(questionId);
        BoardStandard findBoardStandard = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findBoardStandard;
    }

    //총 질문 수 카운트
    public long getTotalBoardStandardCount() {
        return boardStandardRepository.count();
    }

}
