package com.splashzone.tag.dto;

import com.splashzone.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TagDto {
    //    @Positive
    private Long tagId;

    @NotBlank
    private Tag.TagName tagName;
}