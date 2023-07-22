package com.splashzone.tracker.service;

import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.member.entity.Member;
import com.splashzone.member.service.MemberService;
import com.splashzone.tracker.entity.Tracker;
import com.splashzone.tracker.mapper.TrackerMapper;
import com.splashzone.tracker.repository.TrackerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TrackerService {
    private final TrackerRepository trackerRepository;
    private final TrackerMapper trackerMapper;
    private final MemberService memberService;

    public Tracker createTracker(Tracker tracker) throws ParseException {
        Member findMember = memberService.findVerifiedMember(tracker.getMember().getMemberId());

        Tracker reBuildTracker = Tracker.builder()
                .title(tracker.getTitle())
                .content(tracker.getContent())
                .todayDate(tracker.getTodayDate())
                .exerciseStartTime(tracker.getExerciseStartTime())
                .exerciseEndTime(tracker.getExerciseEndTime())
                .exerciseTime(tracker.calculateExerciseTime(tracker.getExerciseStartTime(), tracker.getExerciseEndTime()))
                .member(findMember)
                .build();

        findMember.getTrackers().add(reBuildTracker);

        return trackerRepository.save(reBuildTracker);
    }

    public Tracker updateTracker(Tracker tracker) throws ParseException {
        Tracker findTracker = findVerifiedTracker(tracker.getTrackerId());

        findTracker.changeTracker(tracker);

        return trackerRepository.save(findTracker);
    }

    @Transactional(readOnly = true)
    public Tracker findTracker(Long trackerId) {
        return findVerifiedTracker(trackerId);
    }

    public Page<Tracker> findTrackers(Integer page, Integer size) {
        return trackerRepository.findAll(PageRequest.of(page, size, Sort.by("trackerId").descending()));
    }

    public void deleteTracker(Long trackerId) {
        Tracker findTracker = findVerifiedTracker(trackerId);

        trackerRepository.delete(findTracker);
    }

    private Tracker findVerifiedTracker(Long trackerId) {
        Optional<Tracker> optionalTracker = trackerRepository.findById(trackerId);

        Tracker findTracker =
                optionalTracker.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.TRACKER_NOT_FOUND));

        return findTracker;
    }
}
