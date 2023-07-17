package com.splashzone.member.controller;

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

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive Long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
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
    public ResponseEntity terminatedMember(
            @PathVariable("member-id") @Positive Long memberId) {
        memberService.terminateMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
