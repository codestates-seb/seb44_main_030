package com.splashzone.boardstandard.dto;

import com.splashzone.member.dto.MemberDto;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class BoardStandardDto {
    @Getter
    @Setter
    public static class Post{
        @Positive
        private Long memberId;
        @NotBlank(message = "제목을 입력하세요")
        private String title;
        @NotBlank(message = "내용을 입력하세요")
        private String content;
    }

    @Getter
    @Setter
    public static class Patch{
        @Positive
        private Long memberId;
        @Positive
        private long standardId;
        private String title;
        private String content;
        private long view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        public void setStandardId(Long standardId) {
            this.standardId = standardId;
        }

    }

    @Getter
    @Setter
    public static class Response{
        private long standardId;
        private String title;
        private String content;
        private int view;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private MemberDto.Response member;
    }

    @Getter
    public static class CountResponse{
        private long standardCount;
    }

    @Getter
    @Setter
    public static class CommentResponse{
        private long standardId;
        private String standardContent;
        private LocalDateTime dateCreated;
        private LocalDateTime dateModified;
        private MemberDto.Response member;

    }
}
