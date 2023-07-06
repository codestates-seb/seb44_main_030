package com.splashzone.member;

import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.MemberRemoval;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
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
        member.setPassword(member.getPassword());
        member.setEmail(member.getEmail());

        member.setCreatedAt(LocalDateTime.now());

        return memberRepository.save(member);
    }


    public Member updateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findById(member.getMemberId());
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        //이름, 이메일 변경은 구현에서 뻄 (변경안됨)
        Optional.ofNullable(member.getBio()).ifPresent(bio -> fm.setBio(member.getBio()));

        return memberRepository.save(fm);
    }


    public Member findMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }


    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void terminateMember(long memberId) {
        Member findMember = findMember(memberId);
        memberRepository.delete(findMember);
    }
}
