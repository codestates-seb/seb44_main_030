package com.splashzone.boardstandardcomment.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardstandardcomment.dto.BoardStandardCommentDto;
import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.boardstandardcomment.mapper.BoardStandardCommentMapper;
import com.splashzone.boardstandardcomment.service.BoardStandardCommentService;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/standardcomments")
@Validated
@RequiredArgsConstructor
public class BoardStandardCommentController {
    private final static String BOARD_STANDARD_COMMENT_DEFAULT_URL = "/standardcomments";
    private final BoardStandardCommentService boardStandardCommentService;
    private final BoardStandardCommentMapper boardStandardCommentMapper;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity postBoardStandardComment(Authentication authentication,
                                                   @Valid @RequestBody BoardStandardCommentDto.Post requestBody) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        BoardStandardComment boardStandardComment = boardStandardCommentMapper.boardStandardCommentPostDtotoBoardStandardComment(requestBody, member);

        BoardStandardComment postBoardStandardComment = boardStandardCommentService.createBoardStandardComment(boardStandardComment);

        URI location = UriCreator.createUri(BOARD_STANDARD_COMMENT_DEFAULT_URL, postBoardStandardComment.getBoardStandardCommentId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{standard-comment-id}")
    public ResponseEntity patchBoardStandardComment(Authentication authentication,
                                                    @PathVariable("standard-comment-id") @Positive Long boardStandardCommentId,
                                                    @Valid @RequestBody BoardStandardCommentDto.Patch requestBody) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        BoardStandardComment boardStandardComment = boardStandardCommentMapper.boardStandardCommentPatchDtotoBoardStandardComment(requestBody, boardStandardCommentId, member);

        BoardStandardComment patchBoardStandardComment = boardStandardCommentService.updateBoardStandardComment(boardStandardComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardStandardCommentMapper.boardStandardCommentToBoardStandardCommentResponseDto(patchBoardStandardComment)),
                HttpStatus.OK);
    }

    @GetMapping("/{standard-comment-id}")
    public ResponseEntity getBoardStandardComment(@PathVariable("standard-comment-id") @Positive Long boardStandardCommentId) {
        BoardStandardComment boardStandardComment = boardStandardCommentService.findBoardStandardComment(boardStandardCommentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardStandardCommentMapper.boardStandardCommentToBoardStandardCommentResponseDto(boardStandardComment)),
                HttpStatus.OK);
    }

    /*
    @GetMapping
    public ResponseEntity getBoardStandardComments(@Positive @RequestParam Integer page,
                                                   @Positive @RequestParam Integer size) {
        Page<BoardStandardComment> pageBoardStandardComments = boardStandardCommentService.findBoardStandardComments(page - 1, size);
        List<BoardStandardComment> boardStandardComments = pageBoardStandardComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardStandardCommentMapper.boardStandardCommentsToBoardStandardCommentResponseDtos(boardStandardComments), pageBoardStandardComments),
                HttpStatus.OK);
    }
     */

    @GetMapping("/standards/{standard-id}")
    public ResponseEntity getBoardStandardCommentsByBoardStandard(@PathVariable("standard-id") @Positive Long boardStandardId) {
        List<BoardStandardComment> boardStandardComments = boardStandardCommentService.findBoardStandardComments(boardStandardId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardStandardCommentMapper.boardStandardCommentsToBoardStandardCommentResponseDtos(boardStandardComments)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{standard-comment-id}")
    public ResponseEntity deleteBoardStandardComment(Authentication authentication,
                                                     @PathVariable("standard-comment-id") @Positive Long boardStandardCommentId) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardStandardCommentService.findBoardStandardComment(boardStandardCommentId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        boardStandardCommentService.deleteBoardStandardComment(boardStandardCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
