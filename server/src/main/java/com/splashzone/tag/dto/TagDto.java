package com.splashzone.tag.dto;

import com.splashzone.tag.entity.Tag;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Builder
public class TagDto {
    //    @Positive
    private long tagId;

    @NotBlank
    private Tag.TagName tagName;
}