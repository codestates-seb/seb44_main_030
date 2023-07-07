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
        Member member = new Member();
        member.setMemberId(requestBody.getMemberId());

        return BoardClub.builder()
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .dueDate(requestBody.getDueDate())
                .contact(requestBody.getContact())
                .member(member)
                .boardClubTags(getBoardClubTagsFromTagDto(requestBody.getTags()))
                .build();
    }

    default BoardClub boardClubPatchDtotoBoardClub(BoardClubDto.Patch requestBody, Long boardClubId) {
        return BoardClub.builder()
                .boardClubId(boardClubId)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .dueDate(requestBody.getDueDate())
                .contact(requestBody.getContact())
                .boardClubTags(getBoardClubTagsFromTagDto(requestBody.getTags()))
                .boardClubStatus(requestBody.getBoardClubStatus())
                .build();
    }

    default BoardClubDto.Response boardClubToBoardClubResponseDto(BoardClub boardClub) {
        return BoardClubDto.Response.builder()
                .boardClubId(boardClub.getBoardClubId())
                .memberId(boardClub.getMember().getMemberId())
                .title(boardClub.getTitle())
                .content(boardClub.getContent())
                .dueDate(boardClub.getDueDate())
                .contact(boardClub.getContact())
                .view(boardClub.getView())
                .tags(getTagDtoFromBoardClubTag(boardClub.getBoardClubTags()))
                .boardClubStatus(boardClub.getBoardClubStatus())
                .createdAt(boardClub.getCreatedAt())
                .modifiedAt(boardClub.getModifiedAt())
                .build();
    }

    default List<BoardClubDto.Response> boardClubsToBoardClubResponseDtos(List<BoardClub> boardClubs) {
        List<BoardClubDto.Response> list = new ArrayList<BoardClubDto.Response>(boardClubs.size());
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

    private static List<TagDto> getTagDtoFromBoardClubTag(List<BoardClubTag> boardClubTags) {
        List<TagDto> tagDtos = boardClubTags.stream()
                .map(boardClubTag ->
                        TagDto.builder()
                                .tagId(boardClubTag.getTag().getTagId())
                                .tagName(boardClubTag.getTag().getTagName())
                                .build())
                .collect(Collectors.toList());

        return tagDtos;
    }

    /*
    private static List<BoardClubTagDto> getBoardClubTagDtosFromBoardClubTags(List<BoardClubTag> boardClubTags) {
        List<BoardClubTagDto> boardClubTagDtos = new ArrayList<>();

        for (BoardClubTag boardClubTag : boardClubTags) {
            boardClubTagDtos.add(new BoardClubTagDto(boardClubTag.getTag().getTagId(), boardClubTag.getTag().getTagName()));
        }

        return boardClubTagDtos;
    }
     */
}