package com.splashzone.member.service;

import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.member.entity.Member;
import com.splashzone.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if (optionalMember.isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT);

        //TODO: email, password encrypt 과정 넣어주기!
        member.setName(member.getName());
        member.setPassword(member.getPassword());
        member.setEmail(member.getEmail());
        member.setBio(member.getBio());
        member.setNickname(member.getNickname());

        member.setCreatedAt(LocalDateTime.now());

        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findById(member.getMemberId());
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        //이름, 이메일 변경은 구현에서 뻄 (변경안됨)
        Optional.ofNullable(member.getBio()).ifPresent(bio -> fm.setBio(member.getBio()));
        Optional.ofNullable(member.getNickname()).ifPresent(nickname -> fm.setNickname(member.getNickname()));

        return memberRepository.save(fm);
    }

    @Transactional(readOnly = true)
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void terminateMember(long memberId) {
        Member foundMember = findMember(memberId);
        foundMember.setMemberStatus(Member.MemberStatus.TERMINATED);
        foundMember.setTerminatedAt(LocalDateTime.now());
        memberRepository.save(foundMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }
}
