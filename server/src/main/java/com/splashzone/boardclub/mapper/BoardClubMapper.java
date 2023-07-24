package com.splashzone.boardclub.mapper;

import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclub.entity.BoardClubTag;
import com.splashzone.member.entity.Member;
import com.splashzone.tag.dto.TagDto;
import com.splashzone.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BoardClubMapper {
    default BoardClub boardClubPostDtotoBoardClub(BoardClubDto.Post requestBody) {
        return BoardClub.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .dueDate(requestBody.getDueDate())
                .capacity(requestBody.getCapacity())
                .contact(requestBody.getContact())
                .placeName(requestBody.getPlaceName())
                .addressName(requestBody.getAddressName())
                .latitude(requestBody.getLatitude())
                .longitude(requestBody.getLongitude())
                .boardClubTags(getBoardClubTagsFromTagDto(requestBody.getTags()))
                .build();
    }

    default BoardClub boardClubPatchDtotoBoardClub(BoardClubDto.Patch requestBody, Long boardClubId) {
        return BoardClub.builder()
                .boardClubId(boardClubId)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .dueDate(requestBody.getDueDate())
                .capacity(requestBody.getCapacity())
                .contact(requestBody.getContact())
                .placeName(requestBody.getPlaceName())
                .addressName(requestBody.getAddressName())
                .latitude(requestBody.getLatitude())
                .longitude(requestBody.getLongitude())
                .boardClubTags(getBoardClubTagsFromTagDto(requestBody.getTags()))
                .boardClubStatus(requestBody.getBoardClubStatus())
                .build();
    }

    default BoardClubDto.Response boardClubToBoardClubResponseDto(BoardClub boardClub) {
        return BoardClubDto.Response.builder()
                .boardClubId(boardClub.getBoardClubId())
                .memberId(boardClub.getMember().getMemberId())
                .profileImageUrl(boardClub.getMember().getProfileImageUrl())
                .nickname(boardClub.getMember().getNickname())
                .title(boardClub.getTitle())
                .content(boardClub.getContent())
                .dueDate(boardClub.getDueDate())
                .capacity(boardClub.getCapacity())
                .contact(boardClub.getContact())
                .placeName(boardClub.getPlaceName())
                .addressName(boardClub.getAddressName())
                .latitude(boardClub.getLatitude())
                .longitude(boardClub.getLongitude())
                .view(boardClub.getView())
                .tags(getTagDtosFromBoardClubTag(boardClub.getBoardClubTags()))
                .likeCount(boardClub.getLikeCount())
                .boardClubStatus(boardClub.getBoardClubStatus())
                .createdAt(boardClub.getCreatedAt())
                .modifiedAt(boardClub.getModifiedAt())
                .build();
    }

    default List<BoardClubDto.Response> boardClubsToBoardClubResponseDtos(List<BoardClub> boardClubs) {
        List<BoardClubDto.Response> list = new ArrayList<>(boardClubs.size());

        for (BoardClub boardClub : boardClubs) {
            list.add(boardClubToBoardClubResponseDto(boardClub));
        }

        return list;
    }


    private static List<BoardClubTag> getBoardClubTagsFromTagDto(List<TagDto> tagDtos) {
        List<BoardClubTag> boardClubTags = tagDtos.stream()
                .map(tagDto ->
                        BoardClubTag.builder()
                                .tag(Tag.builder()
                                        .tagId(tagDto.getTagId())
                                        .tagName(tagDto.getTagName())
                                        .build())
                                .build())
                .collect(Collectors.toList());

        return boardClubTags;
    }

    private static List<TagDto> getTagDtosFromBoardClubTag(List<BoardClubTag> boardClubTags) {
        List<TagDto> tagDtos = boardClubTags.stream()
                .map(boardClubTag ->
                        TagDto.builder()
                                .tagId(boardClubTag.getTag().getTagId())
                                .tagName(boardClubTag.getTag().getTagName())
                                .build())
                .collect(Collectors.toList());

        return tagDtos;
    }
}