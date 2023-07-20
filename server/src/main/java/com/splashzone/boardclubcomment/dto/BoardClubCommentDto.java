package com.splashzone.boardclubcomment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class BoardClubCommentDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @Positive
        private Long memberId;

        @Positive
        private Long boardClubId;

        @NotBlank(message = "내용을 입력해 주세요.")
        private String content;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch {
        @Positive
        private Long memberId;

        @Positive
        private Long boardClubId;

        @Positive
        private Long boardClubCommentId;

        private String content;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long boardClubCommentId;

        private Long memberId;

        private Long boardClubId;

        private String content;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
