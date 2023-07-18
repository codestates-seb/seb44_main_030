package com.splashzone.tracker.mapper;

import com.splashzone.member.entity.Member;
import com.splashzone.tracker.dto.TrackerDto;
import com.splashzone.tracker.entity.Tracker;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TrackerMapper {
    default Tracker trackerPostDtoToTracker(TrackerDto.Post requestBody) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());

        return Tracker.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .exerciseStartTime(requestBody.getExerciseStartTime())
                .exerciseEndTime(requestBody.getExerciseEndTime())
                .member(member)
                .build();
    }

    default Tracker trackerPatchDtoToTracker(TrackerDto.Patch requestBody, Long trackerId) {
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());

        return Tracker.builder()
                .trackerId(trackerId)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .exerciseStartTime(requestBody.getExerciseStartTime())
                .exerciseEndTime(requestBody.getExerciseEndTime())
                .member(member)
                .build();
    }

    default TrackerDto.Response trackerToTrackerResponseDto(Tracker tracker) {
        return TrackerDto.Response.builder()
                .trackerId(tracker.getTrackerId())
                .memberId(tracker.getMember().getMemberId())
                .title(tracker.getTitle())
                .content(tracker.getContent())
                .exerciseTime(tracker.getExerciseTime())
                .createdAt(tracker.getCreatedAt())
                .modifiedAt(tracker.getModifiedAt())
                .build();
    }
}
