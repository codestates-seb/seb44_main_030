package com.splashzone.boardclubcomment.controller;

import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardclubcomment.mapper.BoardClubCommentMapper;
import com.splashzone.boardclubcomment.service.BoardClubCommentService;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/clubcomments")
@Validated
@RequiredArgsConstructor
public class BoardClubCommentController {
    private final static String BOARD_CLUB_COMMENT_DEFAULT_URL = "/clubcomments";
    private final BoardClubCommentService boardClubCommentService;
    private final BoardClubCommentMapper boardClubCommentMapper;

    @PostMapping
    public ResponseEntity postBoardClubComment(@Valid @RequestBody BoardClubCommentDto.Post requestBody) {
        BoardClubComment boardClubComment = boardClubCommentService.createBoardClubComment(
                boardClubCommentMapper.boardClubCommentPostDtotoBoardClubComment(requestBody));

        URI location = UriCreator.createUri(BOARD_CLUB_COMMENT_DEFAULT_URL, boardClubComment.getBoardClubCommentId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{club-comment-id}")
    public ResponseEntity patchBoardClubComment(@PathVariable("club-comment-id") @Positive Long boardClubCommentId,
                                                @Valid @RequestBody BoardClubCommentDto.Patch requestBody) {
        BoardClubComment boardClubComment = boardClubCommentService.updateBoardClubComment(
                boardClubCommentMapper.boardClubCommentPatchDtotoBoardClubComment(requestBody, boardClubCommentId));

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardClubCommentMapper.boardClubCommentToBoardClubCommentResponseDto(boardClubComment)),
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
    public ResponseEntity deleteBoardClubComment(@PathVariable("club-comment-id") @Positive Long boardClubCommentId) {
        boardClubCommentService.deleteBoardClubComment(boardClubCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
