package com.splashzone.member.service;


import com.splashzone.auth.utils.CustomAuthorityUtils;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.repository.BoardClubRepository;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardclubcomment.repository.BoardClubCommentRepository;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.repository.BoardStandardRepository;
import com.splashzone.dolphin.Dolphin;
import com.splashzone.dolphin.DolphinRepository;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final DolphinRepository dolphinRepository;
    private final BoardClubRepository boardClubRepository;
    private final BoardStandardRepository boardStandardRepository;
    private final BoardClubCommentRepository boardClubCommentRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils,
                         DolphinRepository dolphinRepository,
                         BoardClubRepository boardClubRepository,
                         BoardStandardRepository boardStandardRepository,
                         BoardClubCommentRepository boardClubCommentRepository) {

        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.dolphinRepository = dolphinRepository;
        this.boardClubRepository = boardClubRepository;
        this.boardStandardRepository = boardStandardRepository;
        this.boardClubCommentRepository = boardClubCommentRepository;
    }

    public Member createMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if (optionalMember.isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);


        member.setName(member.getName());
        member.setPassword(member.getPassword());
        member.setEmail(member.getEmail());
        member.setBio(member.getBio());
        member.setNickname(member.getNickname());
        member.setCreatedAt(LocalDateTime.now());
        member.setModifiedAt(LocalDateTime.now());

        Member savedMember = memberRepository.save(member);

        Dolphin dolphin = new Dolphin(savedMember);

        dolphinRepository.save(dolphin);
        return savedMember;
    }

    public Member updateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findById(member.getMemberId());
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        //이름, 이메일 변경은 구현에서 뻄 (변경안됨)
        Optional.ofNullable(member.getBio()).ifPresent(bio -> fm.setBio(member.getBio()));
        Optional.ofNullable(member.getNickname()).ifPresent(nickname -> fm.setNickname(member.getNickname()));
        member.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(fm);
    }

    @Transactional(readOnly = true)
    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));
    }

    public void terminateMember(Long memberId) {
        Member foundMember = findMember(memberId);
        foundMember.setMemberStatus(Member.MemberStatus.TERMINATED);
        foundMember.setTerminatedAt(LocalDateTime.now());
        memberRepository.save(foundMember);
    }

    @Transactional(readOnly = true)
    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    @Transactional(readOnly = true)
    public Member findMemberByUsername(String username) {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public Page<BoardStandard> findStandardBoardsByMember(Long memberId, int page, int size) {
        Member member = findVerifiedMember(memberId);
        return boardStandardRepository.findByMember(member, PageRequest.of(page, size, Sort.by("boardStandardId").descending()));
    }

    // memberId로 findByMember 방법 고려 -> clubRepository
    public Page<BoardClub> findClubBoardsByMember(Long memberId, int page, int size) {
        Member member = findVerifiedMember(memberId);
        return boardClubRepository.findByMember(member, PageRequest.of(page, size, Sort.by("boardClubId").descending()));
    }

    public Page<BoardClubComment> findClubCommentsByMember(Long memberId, int page, int size) {
        Member member = findVerifiedMember(memberId);
        return boardClubCommentRepository.findByMember(member, PageRequest.of(page, size, Sort.by("boardClubCommentId").descending()));
    }
}