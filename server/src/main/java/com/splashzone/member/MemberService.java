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

    public Member registerMember(Member member) {
        String memberEmail = member.getEmail();
        Optional<Member> optionalMember = memberRepository.findByEmail(memberEmail);

        if (optionalMember.isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT);

        member.setRegisteredAt(LocalDateTime.now());

        Member registeredMember = memberRepository.save(member);

        return registeredMember;
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

        Member updatedMember = memberRepository.save(selectedMember);

        return updatedMember;
    }

    public void terminateMember(long memberId) {
        Member selectedMember = findMember(memberId);
        selectedMember.setTerminatedAt(LocalDateTime.now());
        selectedMember.setMemberStatus(true);

        memberRepository.save(selectedMember);
    }
}
