package com.splashzone.boardclub.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.mapper.BoardClubMapper;
import com.splashzone.boardclub.repository.BoardClubRepository;
import com.splashzone.boardclub.service.BoardClubService;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
@RequestMapping("/clubs")
@Validated
@RequiredArgsConstructor
public class BoardClubController {
    private final static String BOARD_CLUB_DEFAULT_URL = "/clubs";
    private static final int RECOMMEND_LIKE_COUNT = 5;
    private final BoardClubService boardClubService;
    private final BoardClubMapper boardClubMapper;
    private final BoardClubRepository boardClubRepository;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity postBoardClub(Authentication authentication,
                                        @Valid @RequestBody BoardClubDto.Post postDto) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());
        System.out.println("postClub MEMBER: " + member);

        BoardClub boardClub = boardClubMapper.boardClubPostDtotoBoardClub(postDto);
        boardClub.setMember(member);

        BoardClub postBoardClub = boardClubService.createBoardClub(boardClub);
        URI location = UriCreator.createUri(BOARD_CLUB_DEFAULT_URL, postBoardClub.getBoardClubId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{club-id}")
    public ResponseEntity patchBoardClub(Authentication authentication,
                                         @PathVariable("club-id") @Positive Long boardClubId,
                                         @Valid @RequestBody BoardClubDto.Patch patchDto) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardClubService.findBoardClub(boardClubId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());
        System.out.println("patchClub MEMBER: " + member);

        BoardClub boardClub = boardClubMapper.boardClubPatchDtotoBoardClub(patchDto, boardClubId);
        boardClub.setMember(member);

        boardClub.setBoardClubId(boardClubId);

        BoardClub patchBoardClub = boardClubService.updateBoardClub(boardClub);

        return new ResponseEntity<>(new SingleResponseDto<>(boardClubMapper.boardClubToBoardClubResponseDto(patchBoardClub)), HttpStatus.OK);
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
    public ResponseEntity deleteBoardClub(Authentication authentication,
                                          @PathVariable("club-id") @Positive Long boardClubId) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                boardClubService.findBoardClub(boardClubId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        boardClubService.deleteBoardClub(boardClubId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{club-id}/likes")
    public ResponseEntity likeBoardClub(Authentication authentication,
                                        @PathVariable("club-id") @Positive Long boardClubId) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        return new ResponseEntity<>(
                new SingleResponseDto<>(boardClubService.updateLikeOfBoardClub(boardClubId, member.getMemberId())),
                HttpStatus.OK);
    }

    @GetMapping("/best")
    public ResponseEntity getBestBoardClubs(@PageableDefault(size = 5, sort = "likeCount", direction = Sort.Direction.DESC) final Pageable pageable) {
        Page<BoardClub> pageBoardClubs = boardClubRepository.findByLikeCountGreaterThanEqual(pageable, RECOMMEND_LIKE_COUNT);
        List<BoardClub> boardClubs = pageBoardClubs.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardClubMapper.boardClubsToBoardClubResponseDtos(boardClubs), pageBoardClubs), HttpStatus.OK);
    }
}