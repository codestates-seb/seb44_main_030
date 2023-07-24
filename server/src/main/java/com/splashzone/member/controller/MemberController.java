package com.splashzone.member.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.mapper.BoardClubMapper;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardclubcomment.mapper.BoardClubCommentMapper;
import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.mapper.BoardStandardMapper;
import com.splashzone.boardstandardcomment.dto.BoardStandardCommentDto;
import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.boardstandardcomment.mapper.BoardStandardCommentMapper;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.member.dto.MemberDto;
import com.splashzone.member.mapper.MemberMapper;
import com.splashzone.member.service.MemberService;
import com.splashzone.member.entity.Member;
import com.splashzone.tracker.dto.TrackerDto;
import com.splashzone.tracker.entity.Tracker;
import com.splashzone.tracker.mapper.TrackerMapper;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final BoardStandardMapper boardStandardMapper;
    private final BoardClubMapper boardClubMapper;
    private final BoardStandardCommentMapper boardStandardCommentMapper;
    private final BoardClubCommentMapper boardClubCommentMapper;
    private final TrackerMapper trackerMapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        member.setMemberStatus(Member.MemberStatus.ACTIVE);
        member.setProfileImageUrl("image/default.png");
        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(Authentication authentication,
                                      @PathVariable("member-id") @Positive Long memberId,
                                      @Valid @RequestBody MemberDto.Patch patchDto) {

        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()).getMemberId(), memberId)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        patchDto.setMemberId(memberId);

        Member member = memberService.updateMember(mapper.memberPatchToMember(patchDto));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    @PatchMapping("/image/{member-id}")
    public ResponseEntity<String> patchImage(@RequestPart MultipartFile multipartFile,
                                             @PathVariable("member-id") @Positive Long memberId) {
        String uploadedFileName = memberService.uploadImage(multipartFile, memberId);

        return new ResponseEntity<>(uploadedFileName, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(Authentication authentication,
                                    @PathVariable("member-id") @Positive Long memberId) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()).getMemberId(), memberId)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Member member = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(member);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

//    @GetMapping
//    public ResponseEntity getMembers(@Positive @RequestParam Integer page,
//                                     @Positive @RequestParam Integer size) {
//        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
//        List<Member> members = pageMembers.getContent();
//        return ResponseEntity.ok(new MultiResponseDto(mapper.membersToMemberResponses(members), pageMembers));
//    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity terminatedMember(Authentication authentication,
                                           @PathVariable("member-id") @Positive Long memberId) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()).getMemberId(), memberId)) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        memberService.terminateMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/mypage/standards/{member-id}")
    public ResponseEntity getMyStandardBoards(Authentication authentication,
                                              @PathVariable("member-id") @Positive Long memberId,
                                              @Positive @RequestParam Integer page,
                                              @Positive @RequestParam Integer size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<BoardStandard> pageBoardStandards = memberService.findStandardBoardsByMember(memberId, page - 1, size);
        List<BoardStandard> boardStandards = pageBoardStandards.getContent();

        return ResponseEntity.ok(new MultiResponseDto<>(
                boardStandardMapper.boardStandardsToBoardStandardResponseDtos(boardStandards), pageBoardStandards));
    }

    @GetMapping("/mypage/clubs/{member-id}")
    public ResponseEntity getMyClubBoards(Authentication authentication,
                                          @PathVariable("member-id") @Positive Long memberId,
                                          @Positive @RequestParam Integer page,
                                          @Positive @RequestParam Integer size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<BoardClub> pageBoardClubs = memberService.findClubBoardsByMember(memberId, page - 1, size);
        List<BoardClub> boardClubs = pageBoardClubs.getContent();

        return ResponseEntity.ok(new MultiResponseDto<>(
                boardClubMapper.boardClubsToBoardClubResponseDtos(boardClubs), pageBoardClubs));
    }

    @GetMapping("/mypage/standardcomments/{member-id}")
    public ResponseEntity geyMyStandardComments(Authentication authentication,
                                                @PathVariable("member-id") Long memberId,
                                                @Positive @RequestParam Integer page,
                                                @Positive @RequestParam Integer size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<BoardStandardComment> pageBoardStandardComments = memberService.findStandardCommentsByMember(memberId, page - 1, size);
        List<BoardStandardComment> boardStandardComments = pageBoardStandardComments.getContent();

        return ResponseEntity.ok(new MultiResponseDto<>(
                boardStandardCommentMapper.boardStandardCommentsToBoardStandardCommentResponseDtos(boardStandardComments), pageBoardStandardComments));
    }

    @GetMapping("/mypage/clubcomments/{member-id}")
    public ResponseEntity getMyClubComments(Authentication authentication,
                                            @PathVariable("member-id") @Positive Long memberId,
                                            @Positive @RequestParam Integer page,
                                            @Positive @RequestParam Integer size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<BoardClubComment> pageBoardClubComments = memberService.findClubCommentsByMember(memberId, page - 1, size);
        List<BoardClubComment> boardClubComments = pageBoardClubComments.getContent();

        return ResponseEntity.ok(new MultiResponseDto<>(
                boardClubCommentMapper.boardClubCommentsToBoardClubCommentResponseDtos(boardClubComments), pageBoardClubComments));
    }

    @GetMapping("/mypage/trackers/{member-id}")
    public ResponseEntity getMyTrackers(Authentication authentication,
                                        @PathVariable("member-id") @Positive Long memberId,
                                        @Positive @RequestParam Integer page,
                                        @Positive @RequestParam Integer size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<Tracker> pageTrackers = memberService.findTrackersByMember(memberId, page - 1, size);
        List<Tracker> trackers = pageTrackers.getContent();

        return ResponseEntity.ok(new MultiResponseDto<>(
                trackerMapper.trackersToTrackerResponseDtos(trackers), pageTrackers));
    }

//    @PatchMapping("/logout")
//    public ResponseEntity logout(HttpServletRequest request) {
//        String encryptedRefreshToken = jwtTokenProvider.resolveRefreshToken(request);
//        String accessToken = jwtTokenProvider.resolveAccessToken(request);
//        authService.logout(encryptedRefreshToken, accessToken);
//
//        return new ResponseEntity<>(new SingleResponseDto<>("Logged out successfully"), HttpStatus.NO_CONTENT);
//    }


}