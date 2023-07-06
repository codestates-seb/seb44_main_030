package com.splashzone.boardclub.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.tag.dto.TagDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class BoardClubDto {
    @Getter
    public static class Post {
        @Positive
        private long memberId;

        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        //        @DateTimeFormat(pattern = "yyyy-MM-dd")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//        @NotEmpty(message = "마감일을 지정해 주세요.")
        private LocalDate dueDate;

        @NotBlank(message = "오픈톡 링크를 작성해 주세요.")
        private String contact;

        @NotEmpty(message = "태그를 지정해 주세요.")
        private List<TagDto> tags;
    }

    @Getter
    public static class Patch {
        @Positive
        private long memberId;

        @Positive
        private long boardClubId;

        private String title;

        private String content;

        private LocalDate dueDate;

        private String contact;

        private List<TagDto> tags;

        private BoardClub.BoardClubStatus boardClubStatus;

        public void setBoardClubId(long boardClubId) {
            this.boardClubId = boardClubId;
        }
    }

    @Getter
    @Builder
    public static class Response {
        private long boardClubId;

        private long memberId;

        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate dueDate;

        private String contact;

        private long view;

        private List<TagDto> tags;

        private BoardClub.BoardClubStatus boardClubStatus;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}