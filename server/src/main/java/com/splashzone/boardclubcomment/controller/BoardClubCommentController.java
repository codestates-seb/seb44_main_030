package com.splashzone.boardclubcomment.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardclubcomment.mapper.BoardClubCommentMapper;
import com.splashzone.boardclubcomment.service.BoardClubCommentService;
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
@RequestMapping("/clubcomments")
@Validated
@RequiredArgsConstructor
public class BoardClubCommentController {
    private final static String BOARD_CLUB_COMMENT_DEFAULT_URL = "/clubcomments";
    private final BoardClubCommentService boardClubCommentService;
    private final BoardClubCommentMapper boardClubCommentMapper;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity postBoardClubComment(Authentication authentication,
                                               @Valid @RequestBody BoardClubCommentDto.Post requestBody) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        BoardClubComment boardClubComment = boardClubCommentMapper.boardClubCommentPostDtotoBoardClubComment(requestBody, member);

        BoardClubComment postBoardClubComment = boardClubCommentService.createBoardClubComment(boardClubComment);

        URI location = UriCreator.createUri(BOARD_CLUB_COMMENT_DEFAULT_URL, postBoardClubComment.getBoardClubCommentId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{club-comment-id}")
    public ResponseEntity patchBoardClubComment(Authentication authentication,
                                                @PathVariable("club-comment-id") @Positive Long boardClubCommentId,
                                                @Valid @RequestBody BoardClubCommentDto.Patch requestBody) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardClubCommentService.findBoardClubComment(boardClubCommentId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        BoardClubComment boardClubComment = boardClubCommentMapper.boardClubCommentPatchDtotoBoardClubComment(requestBody, boardClubCommentId, member);

        BoardClubComment patchBoardClubComment = boardClubCommentService.updateBoardClubComment(boardClubComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardClubCommentMapper.boardClubCommentToBoardClubCommentResponseDto(patchBoardClubComment)),
                HttpStatus.OK);
    }

    @GetMapping("/{club-comment-id}")
    public ResponseEntity getBoardClubComment(@PathVariable("club-comment-id") @Positive Long boardClubCommentId) {
        BoardClubComment boardClubComment = boardClubCommentService.findBoardClubComment(boardClubCommentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardClubCommentMapper.boardClubCommentToBoardClubCommentResponseDto(boardClubComment)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoardClubComments(@Positive @RequestParam Integer page,
                                               @Positive @RequestParam Integer size) {
        Page<BoardClubComment> pageBoardClubComments = boardClubCommentService.findBoardClubComments(page - 1, size);
        List<BoardClubComment> boardClubComments = pageBoardClubComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardClubCommentMapper.boardClubCommentsToBoardClubCommentResponseDtos(boardClubComments), pageBoardClubComments),
                HttpStatus.OK);
    }


    @DeleteMapping("/{club-comment-id}")
    public ResponseEntity deleteBoardClubComment(Authentication authentication,
                                                 @PathVariable("club-comment-id") @Positive Long boardClubCommentId) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardClubCommentService.findBoardClubComment(boardClubCommentId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        boardClubCommentService.deleteBoardClubComment(boardClubCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
