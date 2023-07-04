package com.splashzone.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {
    private MemberService memberService;

    @Autowired
    public MemberController (MemberService memberService) {
        this.memberService = memberService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/members")
    public Member postMember(@RequestBody MemberDto memberDto) {
        Member member = new Member(memberDto);
        Member registeredMember = memberService.registerMember(member);

        return registeredMember;
    }

    @GetMapping("/members")
    public List<Member> getMembers() {
        List<Member> allMembers = memberService.findAllMembers();

        return allMembers;
    }

    @GetMapping("/members/{memberId}")
    public Member getMember(@PathVariable("memberId") long memberId) {
        Member selectedMember = memberService.findMember(memberId);

        return selectedMember;
    }

    @PatchMapping("/members/{memberId}")
    public Member patchMember(@PathVariable("memberId") long memberId,
                              @RequestBody MemberDto memberDto) {
        Member member = new Member(memberDto);
        Member updatedMember = memberService.updateMember(memberId, member);

        return updatedMember;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/members/{memberId}")
    public void deleteMember(@PathVariable("memberId") long memberId) {
        memberService.terminateMember(memberId);
    }
}
