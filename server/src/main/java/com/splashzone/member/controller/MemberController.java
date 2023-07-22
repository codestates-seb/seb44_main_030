package com.splashzone.member.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.member.dto.MemberDto;
import com.splashzone.member.mapper.MemberMapper;
import com.splashzone.member.service.MemberService;
import com.splashzone.member.entity.Member;
import com.splashzone.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    @Autowired
    public MemberController(MemberService memberService,
                            MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

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
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(member);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return ResponseEntity.ok(new MultiResponseDto(mapper.membersToMemberResponses(members), pageMembers));
    }

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
                                              @Positive @RequestParam int page,
                                              @Positive @RequestParam int size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<BoardStandard> boardStandardPage = memberService.findStandardBoardsByMember(memberId, page - 1, size);
        List<BoardStandardDto.Response> boardStandardResponses = boardStandardPage.getContent().stream()
                .map(mapper::boardStandardToBoardStandardResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new MultiResponseDto<>(boardStandardResponses, boardStandardPage));
    }

    @GetMapping("/mypage/clubs/{member-id}")
    public ResponseEntity getMyClubBoards(Authentication authentication,
                                          @PathVariable("member-id") @Positive Long memberId,
                                          @Positive @RequestParam int page,
                                          @Positive @RequestParam int size) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }


        Page<BoardClub> boardClubPage = memberService.findClubBoardsByMember(memberId, page - 1, size);
        List<BoardClubDto.Response> boardClubResponses = boardClubPage.getContent().stream()
                .map(mapper::boardClubToBoardClubResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new MultiResponseDto<>(boardClubResponses, boardClubPage));
    }

    @GetMapping("/mypage/clubcomments/{member-id}")
    public ResponseEntity getMyClubComments(Authentication authentication,
                                            @PathVariable("member-id") @Positive Long memberId,
                                            @Positive @RequestParam int page,
                                            @Positive @RequestParam int size) {

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                memberService.findMember(memberId))) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        Page<BoardClubComment> boardClubCommentPage = memberService.findClubCommentsByMember(memberId, page - 1, size);
        List<BoardClubCommentDto.Response> boardClubCommentResponses = boardClubCommentPage.getContent().stream()
                .map(mapper::boardClubCommentToBoardClubCommentResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new MultiResponseDto<>(boardClubCommentResponses, boardClubCommentPage));
    }


//    @DeleteMapping("/logout")
//    public ResponseEntity logout(@RequestHeader("Access") @Positive String accessToken) {
//        log.info(accessToken);
//        accessTokenService.deleteAccessToken(accessToken);
//        return new ResponseEntity(HttpStatus.OK);
//    }
}