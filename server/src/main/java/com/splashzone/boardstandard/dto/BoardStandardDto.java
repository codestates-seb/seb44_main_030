package com.splashzone.boardstandard.dto;

import com.splashzone.member.dto.MemberDto;
import com.splashzone.tag.dto.TagDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class BoardStandardDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @NotBlank(message = "제목을 입력하세요")
        private String title;

        @NotBlank(message = "내용을 입력하세요")
        private String content;

        @NotEmpty(message = "태그를 지정해 주세요.")
        private List<TagDto> tags;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch {
        private String title;

        private String content;

        @NotEmpty
        private List<TagDto> tags;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long boardStandardId;

        private Long memberId;

        private String profileImageUrl;

        private String nickname;

        private String title;

        private String content;

        private int view;

        private List<TagDto> tags;

        private int likeCount;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }

    @Getter
    public static class CountResponse{
        private long standardCount;
    }
}
