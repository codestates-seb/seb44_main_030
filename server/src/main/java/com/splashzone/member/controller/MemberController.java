package com.splashzone.member.controller;

import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
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

    @PostMapping("/members")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);
        member.setMemberStatus(Member.MemberStatus.ACTIVE);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/members/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive Long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    @GetMapping("/members/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.findMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(member);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping("/members")
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return ResponseEntity.ok(new MultiResponseDto(mapper.membersToMemberResponses(members), pageMembers));
    }

    @DeleteMapping("/members/{member-id}")
    public ResponseEntity terminatedMember(
            @PathVariable("member-id") @Positive Long memberId) {
        memberService.terminateMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @DeleteMapping("/logout")
//    public ResponseEntity logout(@RequestHeader("Access") @Positive String accessToken) {
//        log.info(accessToken);
//        accessTokenService.deleteAccessToken(accessToken);
//        return new ResponseEntity(HttpStatus.OK);
//    }
    @GetMapping("/mypage/standards/{member-id}")
    public ResponseEntity getMyStandardBoards(
            @PathVariable("member-id") @Positive Long memberId,
            @Positive @RequestParam int page,
            @Positive @RequestParam int size) {
        Page<BoardStandard> boardStandardPage = memberService.findStandardBoardsByMember(memberId, page - 1, size);
        List<BoardStandardDto.Response> boardStandardResponses = boardStandardPage.getContent().stream()
                .map(mapper::boardStandardToBoardStandardResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new MultiResponseDto<>(boardStandardResponses, boardStandardPage));
    }

    @GetMapping("/mypages/clubs/{member-id}")
    public ResponseEntity getMyClubBoards(
            @PathVariable("member-id") @Positive Long memberId,
            @Positive @RequestParam int page,
            @Positive @RequestParam int size) {
        Page<BoardClub> boardClubPage = memberService.findClubBoardsByMember(memberId, page - 1, size);
        List<BoardClubDto.Response> boardClubResponses = boardClubPage.getContent().stream()
                .map(mapper::boardClubToBoardClubResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new MultiResponseDto<>(boardClubResponses, boardClubPage));
    }
}