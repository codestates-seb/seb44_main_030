package com.splashzone.tracker.controller;

import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.dto.MultiResponseDto;
import com.splashzone.dto.SingleResponseDto;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import com.splashzone.tracker.dto.TrackerDto;
import com.splashzone.tracker.entity.Tracker;
import com.splashzone.tracker.mapper.TrackerMapper;
import com.splashzone.tracker.service.TrackerService;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.sound.midi.Track;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.text.ParseException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/trackers")
@Validated
@RequiredArgsConstructor
public class TrackerController {
    private final static String TRACKER_DEFAULT_URL = "/trackers";
    private final TrackerService trackerService;
    private final TrackerMapper trackerMapper;
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity postTracker(Authentication authentication,
                                      @Valid @RequestBody TrackerDto.Post requestBody) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        Tracker tracker = trackerMapper.trackerPostDtoToTracker(requestBody, member);

        Tracker postTracker = trackerService.createTracker(tracker);
        URI location = UriCreator.createUri(TRACKER_DEFAULT_URL, postTracker.getTrackerId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{tracker-id}")
    public ResponseEntity patchTracker(Authentication authentication,
                                       @PathVariable("tracker-id") @Positive Long trackerId,
                                       @Valid @RequestBody TrackerDto.Patch requestBody) {
        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberService.findMemberByUsername(memberDetails.getUsername());

        Tracker tracker = trackerMapper.trackerPatchDtoToTracker(requestBody, trackerId, member);

        Tracker patchTracker = trackerService.updateTracker(tracker);

        return new ResponseEntity<>(
                new SingleResponseDto<>(trackerMapper.trackerToTrackerResponseDto(patchTracker)), HttpStatus.OK);
    }

    @GetMapping("/{tracker-id}")
    public ResponseEntity getTracker(@PathVariable("tracker-id") @Positive Long trackerId) {
        Tracker tracker = trackerService.findTracker(trackerId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(trackerMapper.trackerToTrackerResponseDto(tracker)), HttpStatus.OK);
    }

    /*
    @GetMapping
    public ResponseEntity getTrackers(@Positive @RequestParam Integer page,
                                      @Positive @RequestParam Integer size) {
        Page<Tracker> pageTrackers = trackerService.findTrackers(page - 1, size);
        List<Tracker> trackers = pageTrackers.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(trackerMapper.trackersToTrackerResponseDtos(trackers), pageTrackers), HttpStatus.OK);
    }
     */

    @DeleteMapping("/{tracker-id}")
    public ResponseEntity deleteTracker(Authentication authentication,
                                        @PathVariable("tracker-id") @Positive Long trackerId) {
        if (authentication == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        UserDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        if (!Objects.equals(memberService.findMemberByUsername(memberDetails.getUsername()),
                trackerService.findTracker(trackerId).getMember())) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

        trackerService.deleteTracker(trackerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
