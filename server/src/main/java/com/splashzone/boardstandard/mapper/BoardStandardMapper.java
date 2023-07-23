package com.splashzone.boardstandard.mapper;

import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandard.entity.BoardStandardTag;
import com.splashzone.member.dto.MemberDto;
import com.splashzone.member.entity.Member;
import com.splashzone.member.mapper.MemberMapper;
import com.splashzone.tag.dto.TagDto;
import com.splashzone.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring")
public interface BoardStandardMapper {
    default BoardStandard boardStandardPostDtoToBoardStandard(BoardStandardDto.Post requestBody) {
        return BoardStandard.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .boardStandardTags(getBoardStandardTagsFromTagDto(requestBody.getTags()))
                .build();
    }

    default BoardStandard boardStandardPatchDtoToBoardStandard(BoardStandardDto.Patch requestBody, Long boardStandardId) {
        return BoardStandard.builder()
                .boardStandardId(boardStandardId)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .boardStandardTags(getBoardStandardTagsFromTagDto(requestBody.getTags()))
                .build();
    }

    default BoardStandardDto.Response boardStandardToBoardStandardResponseDto(BoardStandard boardStandard) {
        if (boardStandard == null) {
            return null;
        }

        return BoardStandardDto.Response.builder()
                .boardStandardId(boardStandard.getBoardStandardId())
                .memberId(boardStandard.getMember().getMemberId())
                .profileImageUrl(boardStandard.getMember().getProfileImageUrl())
                .nickname(boardStandard.getMember().getNickname())
                .title(boardStandard.getTitle())
                .content(boardStandard.getContent())
                .view(boardStandard.getView())
                .tags(getTagDtosFromBoardStandardTag(boardStandard.getBoardStandardTags()))
                .likeCount(boardStandard.getLikeCount())
                .createdAt(boardStandard.getCreatedAt())
                .modifiedAt(boardStandard.getModifiedAt())
                .build();
    }

    default List<BoardStandardDto.Response> boardStandardsToBoardStandardResponseDtos(List<BoardStandard> boardStandards){
        if (boardStandards == null) {
            return null;
        }

        List<BoardStandardDto.Response> list = new ArrayList<>(boardStandards.size());

        for (BoardStandard boardStandard : boardStandards) {
            list.add(boardStandardToBoardStandardResponseDto(boardStandard));
        }

        return list;
    }

    private static List<BoardStandardTag> getBoardStandardTagsFromTagDto(List<TagDto> tagDtos) {
        List<BoardStandardTag> boardStandardTags = tagDtos.stream()
                .map(tagDto ->
                        BoardStandardTag.builder()
                                .tag(Tag.builder()
                                        .tagId(tagDto.getTagId())
                                        .tagName(tagDto.getTagName())
                                        .build())
                                .build())
                .collect(Collectors.toList());

        return boardStandardTags;
    }

    private static List<TagDto> getTagDtosFromBoardStandardTag(List<BoardStandardTag> boardStandardTags) {
        List<TagDto> tagDtos = boardStandardTags.stream()
                .map(boardStandardTag ->
                        TagDto.builder()
                                .tagId(boardStandardTag.getTag().getTagId())
                                .tagName(boardStandardTag.getTag().getTagName())
                                .build())
                .collect(Collectors.toList());

        return tagDtos;
    }
}