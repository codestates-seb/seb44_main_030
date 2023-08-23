package com.splashzone.boardstandard.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardstandard.repository.BoardStandardRepository;
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
import com.splashzone.tag.entity.Tag;
import com.splashzone.tag.service.TagService;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
import java.util.*;

@RestController
@RequestMapping("/standards")
@Validated
@RequiredArgsConstructor
public class BoardStandardController {
    private final static String BOARD_STANDARD_DEFAULT_URL = "/standards";
    private static final int RECOMMEND_LIKE_COUNT = 5;
    private final BoardStandardService boardStandardService;
    private final BoardStandardMapper boardStandardMapper;
    private final BoardStandardRepository boardStandardRepository;
    private final MemberService memberService;
    private final TagService tagService;

    @PostMapping
    public ResponseEntity postBoardStandard(Authentication authentication,
                                            @Valid @RequestBody BoardStandardDto.Post postDto) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        BoardStandard boardStandard = boardStandardMapper.boardStandardPostDtoToBoardStandard(postDto);
        boardStandard.setMember(member);

        BoardStandard postBoardStandard = boardStandardService.createBoardStandard(boardStandard);
        URI location = UriCreator.createUri(BOARD_STANDARD_DEFAULT_URL, postBoardStandard.getBoardStandardId());

        return ResponseEntity.created(location).build();

//        return new ResponseEntity<>(boardStandardMapper.boardStandardToResponseDto(postBoardStandard),
//                HttpStatus.CREATED);
    }

    @PatchMapping("/{standard-id}")
    public ResponseEntity patchBoardStandard(Authentication authentication,
                                             @PathVariable("standard-id") @Positive Long boardStandardId,
                                             @Valid @RequestBody BoardStandardDto.Patch patchDto) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardStandardService.findBoardStandard(boardStandardId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        BoardStandard boardStandard = boardStandardMapper.boardStandardPatchDtoToBoardStandard(patchDto, boardStandardId);
        boardStandard.setMember(member);

        boardStandard.setBoardStandardId(boardStandardId);

        BoardStandard patchBoardStandard = boardStandardService.updateBoardStandard(boardStandard);

        return new ResponseEntity<>(new SingleResponseDto<>(boardStandardMapper.boardStandardToBoardStandardResponseDto(patchBoardStandard)), HttpStatus.OK);
    }

    @GetMapping("/{standard-id}")
    public ResponseEntity getBoardStandard(@PathVariable("standard-id") Long boardStandardId) {
        BoardStandard boardStandard = boardStandardService.findBoardStandard(boardStandardId);

        boardStandardService.updateViews(boardStandardId);

        return new ResponseEntity<>(new SingleResponseDto<>(boardStandardMapper.boardStandardToBoardStandardResponseDto(boardStandard)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoardStandards(@Positive @RequestParam Integer page,
                                            @Positive @RequestParam Integer size) {
        Page<BoardStandard> pageBoardStandards = boardStandardService.findBoardStandards(page - 1, size);
        List<BoardStandard> boardStandards = pageBoardStandards.getContent();

        for (int i = 0; i < boardStandards.size(); i++) {
            System.out.println(boardStandards.get(i).toString());
        }

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardStandardMapper.boardStandardsToBoardStandardResponseDtos(boardStandards), pageBoardStandards), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity getBoardStandardsByKeyword(@Positive @RequestParam Integer page,
                                                     @Positive @RequestParam Integer size,
                                                     @RequestParam(value = "keyword") String keyword) {
        Page<BoardStandard> pageBoardStandards = boardStandardService.searchBoardStandardsByKeyword(page - 1, size, keyword);
        List<BoardStandard> boardStandards = pageBoardStandards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardStandardMapper.boardStandardsToBoardStandardResponseDtos(boardStandards), pageBoardStandards), HttpStatus.OK);
    }

    @GetMapping("/tags/{tag-id}")
    public ResponseEntity getBoardStandardsByTag(@PathVariable("tag-id") @Positive Long tagId,
                                                 @Positive @RequestParam Integer page,
                                                 @Positive @RequestParam Integer size) {
        Tag tag = tagService.findTagById(tagId);
        Page<BoardStandard> pageBoardStandards = boardStandardService.searchBoardStandardsBySpecificTag(tag, page - 1, size);
        List<BoardStandard> boardStandards = pageBoardStandards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardStandardMapper.boardStandardsToBoardStandardResponseDtos(boardStandards), pageBoardStandards), HttpStatus.OK);
    }

    @DeleteMapping("/{standard-id}")
    public ResponseEntity deleteBoardStandard(Authentication authentication,
                                              @PathVariable("standard-id") @Positive Long boardStandardId) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardStandardService.findBoardStandard(boardStandardId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        boardStandardService.deleteBoardStandard(boardStandardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{standard-id}/likes")
    public ResponseEntity likeBoardStandard(Authentication authentication,
                                            @PathVariable("standard-id") @Positive Long boardStandardId) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardStandardService.updateLikeOfBoardStandard(boardStandardId, member.getMemberId())),
                HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity getBestBoardStandards(@PageableDefault(size = 5, sort = "likeCount", direction = Sort.Direction.DESC) final Pageable pageable) {
        Page<BoardStandard> pageBoardStandards = boardStandardRepository.findByLikeCountGreaterThanEqual(pageable, RECOMMEND_LIKE_COUNT);
        List<BoardStandard> boardStandards = pageBoardStandards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardStandardMapper.boardStandardsToBoardStandardResponseDtos(boardStandards), pageBoardStandards), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity getTotalBoardStandardCount() {
        Map<String, Long> count = new HashMap<>();
        count.put("boardStandardCount", boardStandardService.getTotalBoardStandardCount());

        return ResponseEntity.ok(count);
    }
}