package com.splashzone.boardstandardcomment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class BoardStandardCommentDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @Positive
        private Long boardStandardId;

        @NotBlank(message = "내용을 입력해 주세요.")
        private String content;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch {
        @Positive
        private Long boardStandardId;

        private String content;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long boardStandardId;

        private Long boardStandardCommentId;

        private String content;

        private Long memberId;

        private String profileImageUrl;

        private String nickname;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}
