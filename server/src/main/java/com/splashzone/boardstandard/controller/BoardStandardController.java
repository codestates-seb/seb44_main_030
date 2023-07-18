package com.splashzone.boardstandard.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.mapper.BoardStandardMapper;
import com.splashzone.boardstandard.service.BoardStandardService;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/standards")
@RequiredArgsConstructor
@Slf4j
public class BoardStandardController {
    private final BoardStandardService boardStandardService;
    private final BoardStandardMapper boardStandardMapper;
    private final MemberService memberService;
    private final static String STANDARD_DEFAULT_URL = "/standards";


    @PostMapping
    public ResponseEntity postStandard(Authentication authentication,
                                       @Valid @RequestBody BoardStandardDto.Post postDto) {
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());
        System.out.println(member);

        BoardStandard boardStandard = boardStandardMapper.postDtoToBoardStandard(postDto);
        boardStandard.setMember(member);
        boardStandard = boardStandardService.createStandard(boardStandard);
        URI location = UriCreator.createUri(STANDARD_DEFAULT_URL, boardStandard.getStandardId());
//        return ResponseEntity.created(location).build();
        return new ResponseEntity<>(boardStandardMapper.boardStandardToResponseDto(boardStandard),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{standard-id}")
    public ResponseEntity patchStandard(@PathVariable("standard-id") @Positive Long standardId,
                                        @Valid @RequestBody BoardStandardDto.Patch patchDto) {
        patchDto.setStandardId(standardId);
        BoardStandard boardStandard = boardStandardService.updateStandard(boardStandardMapper.patchDtoToBoardStandard(patchDto));

        return new ResponseEntity<>(new SingleResponseDto<>(boardStandardMapper.boardStandardToResponseDto(boardStandard)), HttpStatus.OK);
    }

    @GetMapping("/{standard-id}")
    public ResponseEntity getStandard(@PathVariable("standard-id") Long standardId) {
        BoardStandard boardStandard = boardStandardService.selectStandard(standardId);
        boardStandardService.increaseViews(standardId);
        return new ResponseEntity<>(new SingleResponseDto<>(boardStandardMapper.boardStandardToResponseDto(boardStandard)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getStandards(@RequestParam("page") int page,
                                       @RequestParam("size") int size,
                                       @RequestParam(required = false) String keyword) {
        Page<BoardStandard> pageBoardStandards = boardStandardService.findStandards(page - 1, size);
        List<BoardStandard> boardStandards = pageBoardStandards.getContent();
        for (int i = 0; i < boardStandards.size(); i++) {
            System.out.println(boardStandards.get(i).toString());

        }
        return new ResponseEntity<>(new MultiResponseDto<>(boardStandardMapper.boardStandardToResponseDto(boardStandards), pageBoardStandards), HttpStatus.OK);
    }

    @DeleteMapping("/{standard-id}")
    public ResponseEntity deleteStandard(@Positive @PathVariable("standard-id") Long standardId) {
        boardStandardService.deleteStandard(standardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/count")
    public ResponseEntity getTotalStandardCount() {
        Map<String, Long> count = new HashMap<>();
        count.put("boardStandardCount", boardStandardService.getTotalBoardStandardCount());
        return ResponseEntity.ok(count);
    }

}
