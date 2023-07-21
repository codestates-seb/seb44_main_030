package com.splashzone.tracker.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TrackerDto {
    @Getter
    public static class Post {
//        @Positive
//        private Long memberId;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//        private LocalDate trackerDate;

        private String title;

        private String content;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private String exerciseStartTime;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private String exerciseEndTime;
    }

    @Getter
    public static class Patch {
//        @Positive
//        private Long memberId;
//
//        @Positive
//        private Long trackerId;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//        private LocalDate trackerDate;

        private String title;

        private String content;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private String exerciseStartTime;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
        private String exerciseEndTime;
    }

    @Getter
    @Builder
    public static class Response {
        @Positive
        private Long trackerId;

        @Positive
        private Long memberId;

//        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//        private LocalDate trackerDate;

        private String title;

        private String content;

        private Long exerciseTime;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
