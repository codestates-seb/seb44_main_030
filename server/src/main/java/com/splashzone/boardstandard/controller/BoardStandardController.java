package com.splashzone.boardstandard.controller;

import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.mapper.BoardStandardMapper;
import com.splashzone.boardstandard.service.BoardStandardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.HashMap;
import java.util.Map;

@Validated
@RestController
@RequestMapping("/standards")
@RequiredArgsConstructor
@Slf4j
public class BoardStandardController {
    private final BoardStandardService boardStandardService;
    private final BoardStandardMapper boardStandardMapper;
    private final static String STANDARD_DEFAULT_URL = "/standards";


    @PostMapping
    public ResponseEntity postStandard(@Valid @RequestBody BoardStandardDto.Post postDto){

    }

    @PatchMapping("/{standard-id}")
    public ResponseEntity patchStandard(@PathVariable("standard-id") long standardId){

    }

    @GetMapping("/{standard-id")
    public ResponseEntity getStandard(@PathVariable("standard-id") long standardId){

    }

    @GetMapping
    public ResponseEntity getStandards(@RequestParam("page") int page,
                                       @RequestParam("size") int size,
                                       @RequestParam(required = false) String keyword){

    }

    @DeleteMapping("/{standard-id}")
    public ResponseEntity deleteStandard(@Positive @PathVariable("standard-id") long standardId){

    }

    @GetMapping("/count")
    public ResponseEntity getTotalStandardCount(){
        Map<String, Long> count = new HashMap<>();
        //
    }

    public Long findMemberId(String token){

    }
}
