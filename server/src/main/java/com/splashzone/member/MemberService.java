package com.splashzone.member;

import net.bytebuddy.asm.MemberRemoval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        String memberName = member.getName();
        String memberEmail = member.getEmail();

        Optional<Member> optionalMemberByName = memberRepository.findByName(memberName);
        Optional<Member> optionalMemberByEmail = memberRepository.findByEmail(memberEmail);

        if (optionalMemberByName.isPresent() || optionalMemberByEmail.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT);

        member.setCreatedAt(LocalDateTime.now());

        Member createdMember = memberRepository.save(member);

        return createdMember;
    }

    public List<Member> findAllMembers() {
        List<Member> allMembers = memberRepository.findAll();

        return allMembers;
    }

    public Member findMember(long memberId) {
        Member selectedMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return selectedMember;
    }

    public Member updateMember(long memberId, Member member) {
        Member selectedMember = findMember(memberId);

        if (member.getName() != null) selectedMember.setName(member.getName());
        if (member.getProfileImageUrl() != null) selectedMember.setProfileImageUrl(member.getProfileImageUrl());
        if (member.getBio() != null) selectedMember.setBio(member.getBio());

        Member updatedMember = memberRepository.save(selectedMember);

        return updatedMember;
    }

    public void terminateMember(long memberId) {
        Member selectedMember = findMember(memberId);
        selectedMember.setTerminatedAt(LocalDateTime.now());
        selectedMember.setTerminated(true);

        memberRepository.save(selectedMember);
    }
}
