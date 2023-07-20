package com.splashzone.boardclub.controller;

import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.mapper.BoardClubMapper;
import com.splashzone.boardclub.service.BoardClubService;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.member.service.MemberService;
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
@RequestMapping("/clubs")
@Validated
@RequiredArgsConstructor
public class BoardClubController {
    private final static String BOARD_CLUB_DEFAULT_URL = "/clubs";
    private final BoardClubService boardClubService;
    private final BoardClubMapper boardClubMapper;

    @PostMapping
    public ResponseEntity postBoardClub(@Valid @RequestBody BoardClubDto.Post requestBody) {
        BoardClub boardClub = boardClubService.createBoardClub(boardClubMapper.boardClubPostDtotoBoardClub(requestBody));
        URI location = UriCreator.createUri(BOARD_CLUB_DEFAULT_URL, boardClub.getBoardClubId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{club-id}")
    public ResponseEntity patchBoardClub(@PathVariable("club-id") @Positive Long boardClubId,
                                         @Valid @RequestBody BoardClubDto.Patch requestBody) {
        BoardClub boardClub = boardClubService.updateBoardClub(boardClubMapper.boardClubPatchDtotoBoardClub(requestBody, boardClubId));

        return new ResponseEntity<>(new SingleResponseDto<>(boardClubMapper.boardClubToBoardClubResponseDto(boardClub)), HttpStatus.OK);
    }

    @GetMapping("/{club-id}")
    public ResponseEntity getBoardClub(@PathVariable("club-id") @Positive Long boardClubId) {
        BoardClub boardClub = boardClubService.findBoardClub(boardClubId);

        boardClubService.updateViews(boardClubId);

        return new ResponseEntity<>(new SingleResponseDto<>(boardClubMapper.boardClubToBoardClubResponseDto(boardClub)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getBoardClubs(@Positive @RequestParam Integer page,
                                        @Positive @RequestParam Integer size) {
        Page<BoardClub> pageBoardClubs = boardClubService.findBoardClubs(page - 1, size);
        List<BoardClub> boardClubs = pageBoardClubs.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardClubMapper.boardClubsToBoardClubResponseDtos(boardClubs), pageBoardClubs), HttpStatus.OK);
    }

    @DeleteMapping("/{club-id}")
    public ResponseEntity deleteBoardClub(@PathVariable("club-id") @Positive Long boardClubId) {
        boardClubService.deleteBoardClub(boardClubId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*
    @PostMapping("/{club-id}/likes")
    public ResponseEntity likeBoardClub(@PathVariable("club-id") @Positive Long boardClubId) {

    }

    @GetMapping("/best")
    public ResponseEntity getBestBoardClubs() {

    }
     */
}