package com.splashzone.tracker.controller;

import com.splashzone.dto.SingleResponseDto;
import com.splashzone.member.service.MemberService;
import com.splashzone.tracker.dto.TrackerDto;
import com.splashzone.tracker.entity.Tracker;
import com.splashzone.tracker.mapper.TrackerMapper;
import com.splashzone.tracker.service.TrackerService;
import com.splashzone.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.text.ParseException;

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
    public ResponseEntity postTracker(@Valid @RequestBody TrackerDto.Post requestBody) throws ParseException {
        Tracker tracker = trackerService.createTracker(trackerMapper.trackerPostDtoToTracker(requestBody));
        URI location = UriCreator.createUri(TRACKER_DEFAULT_URL, tracker.getTrackerId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{tracker-id}")
    public ResponseEntity patchTracker(@PathVariable("tracker-id") @Positive Long trackerId,
                                       @Valid @RequestBody TrackerDto.Patch requestBody) throws ParseException {
        Tracker tracker = trackerService.updateTracker(trackerMapper.trackerPatchDtoToTracker(requestBody, trackerId));

        return new ResponseEntity<>(new SingleResponseDto<>(trackerMapper.trackerToTrackerResponseDto(tracker)), HttpStatus.OK);
    }

    @GetMapping("/{tracker-id}")
    public ResponseEntity getTracker(@PathVariable("tracker-id") @Positive Long trackerId) {
        Tracker tracker = trackerService.findTracker(trackerId);

        return new ResponseEntity<>(new SingleResponseDto<>(trackerMapper.trackerToTrackerResponseDto(tracker)), HttpStatus.OK);
    }

    @DeleteMapping("/{tracker-id}")
    public ResponseEntity deleteTracker(@PathVariable("tracker-id") @Positive Long trackerId) {
        trackerService.deleteTracker(trackerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
