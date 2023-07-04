package com.splashzone.boardstandard.service;

import com.splashzone.boardstandard.mapper.BoardStandardMapper;
import com.splashzone.boardstandard.repository.BoardStandardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardStandardService {
    private final BoardStandardMapper standardMapper;
    private final BoardStandardRepository standardRepository;
    private final MemberService memberService;



}
