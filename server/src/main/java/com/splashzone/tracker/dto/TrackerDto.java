package com.splashzone.tracker.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TrackerDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate todayDate;

        @NotBlank
        private String exerciseStartTime;

        @NotBlank
        private String exerciseEndTime;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch {
        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate todayDate;

        private String exerciseStartTime;

        private String exerciseEndTime;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long trackerId;

        private String nickname;

        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate todayDate;

        private Long exerciseTime;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
