package com.splashzone.tracker.mapper;

import com.splashzone.member.entity.Member;
import com.splashzone.tracker.dto.TrackerDto;
import com.splashzone.tracker.entity.Tracker;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TrackerMapper {
    default Tracker trackerPostDtoToTracker(TrackerDto.Post requestBody) {
        return Tracker.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .todayDate(requestBody.getTodayDate())
                .exerciseStartTime(requestBody.getExerciseStartTime())
                .exerciseEndTime(requestBody.getExerciseEndTime())
                .build();
    }

    default Tracker trackerPatchDtoToTracker(TrackerDto.Patch requestBody, Long trackerId) {
        return Tracker.builder()
                .trackerId(trackerId)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .todayDate(requestBody.getTodayDate())
                .exerciseStartTime(requestBody.getExerciseStartTime())
                .exerciseEndTime(requestBody.getExerciseEndTime())
                .build();
    }

    default TrackerDto.Response trackerToTrackerResponseDto(Tracker tracker) {
        return TrackerDto.Response.builder()
                .trackerId(tracker.getTrackerId())
                .memberId(tracker.getMember().getMemberId())
                .title(tracker.getTitle())
                .content(tracker.getContent())
                .todayDate(tracker.getTodayDate())
                .exerciseTime(tracker.getExerciseTime())
                .createdAt(tracker.getCreatedAt())
                .modifiedAt(tracker.getModifiedAt())
                .build();
    }

    default List<TrackerDto.Response> trackersToTrackerResponseDtos(List<Tracker> trackers) {
        List<TrackerDto.Response> list = new ArrayList<>(trackers.size());
        for (Tracker tracker : trackers) {
            list.add(trackerToTrackerResponseDto(tracker));
        }
        return list;
    }
}
