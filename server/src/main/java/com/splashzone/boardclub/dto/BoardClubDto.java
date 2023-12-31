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
        @NotBlank(message = "제목을 작성해 주세요.")
        private String title;

        @NotBlank(message = "내용을 작성해 주세요.")
        private String content;

        //        @DateTimeFormat(pattern = "yyyy-MM-dd")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate dueDate;

        @NotNull(message = "모집 인원수를 작성해 주세요.")
        private Integer capacity;

        @NotBlank(message = "오픈톡 링크를 작성해 주세요.")
        private String contact;

        @NotBlank(message = "장소 이름을 작성해 주세요.")
        private String placeName;

        @NotBlank(message = "주소를 작성해 주세요.")
        private String addressName;

        private Double latitude;

        private Double longitude;

        @NotEmpty(message = "태그를 지정해 주세요.")
        private List<TagDto> tags;
    }

    @Getter
    @NoArgsConstructor
    public static class Patch {
        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate dueDate;

        private Integer capacity;

        private String contact;

        private String placeName;

        private String addressName;

        private Double latitude;

        private Double longitude;

        @NotEmpty
        private List<TagDto> tags;

        private BoardClub.BoardClubStatus boardClubStatus;
    }

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private Long boardClubId;

        private Long memberId;

        private String profileImageUrl;

        private String nickname;

        private String title;

        private String content;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate dueDate;

        private Integer capacity;

        private String contact;

        private String placeName;

        private String addressName;

        private Double latitude;

        private Double longitude;

        private int view;

        private List<TagDto> tags;

        private int likeCount;

        private BoardClub.BoardClubStatus boardClubStatus;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}