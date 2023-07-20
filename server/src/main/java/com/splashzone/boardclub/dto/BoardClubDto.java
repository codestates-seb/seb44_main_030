package com.splashzone.boardclub.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.tag.dto.TagDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class BoardClubDto {
    @Getter
    @NoArgsConstructor
    public static class Post {
        @Positive
        private Long memberId;

        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        //        @DateTimeFormat(pattern = "yyyy-MM-dd")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
//        @NotEmpty(message = "마감일을 지정해 주세요.")
        private LocalDate dueDate;

        @NotNull(message = "모집 인원수를 작성해 주세요.")
        private Integer capacity;

        @NotBlank(message = "오픈톡 링크를 작성해 주세요.")
        private String contact;

        @NotEmpty(message = "태그를 지정해 주세요.")
        private List<TagDto> tags;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch {
        @Positive
        private Long memberId;

        @Positive
        private Long boardClubId;

        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate dueDate;

        private Integer capacity;

        private String contact;

        @NotEmpty
        private List<TagDto> tags;

        private BoardClub.BoardClubStatus boardClubStatus;

//        public void setBoardClubId(Long boardClubId) {
//            this.boardClubId = boardClubId;
//        }
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long boardClubId;

        private Long memberId;

        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate dueDate;

        private Integer capacity;

        private String contact;

        private int view;

        private List<TagDto> tags;

        private BoardClub.BoardClubStatus boardClubStatus;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}