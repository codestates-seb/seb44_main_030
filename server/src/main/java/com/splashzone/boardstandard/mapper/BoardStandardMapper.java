package com.splashzone.boardstandard.mapper;

import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.member.dto.MemberDto;
import com.splashzone.member.entity.Member;
import com.splashzone.member.mapper.MemberMapper;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;


@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface BoardStandardMapper {
    BoardStandard postDtoToBoardStandard(BoardStandardDto.Post postDto);

    BoardStandard patchDtoToBoardStandard(BoardStandardDto.Patch patchDto);

    default BoardStandardDto.Response boardStandardToResponseDto(BoardStandard boardStandard){
        if (boardStandard == null) return null;

        BoardStandardDto.Response responseDto = new BoardStandardDto.Response();

        responseDto.setBoardStandardId(boardStandard.getBoardStandardId());
        responseDto.setTitle(boardStandard.getTitle());
        responseDto.setContent(boardStandard.getContent());
        responseDto.setCreatedAt(boardStandard.getCreatedAt());
        responseDto.setModifiedAt(boardStandard.getModifiedAt());
        responseDto.setView(boardStandard.getView());
        responseDto.setMember(memberToMemberResponse(boardStandard.getMember()));

        return responseDto;
    }
    default List<BoardStandardDto.Response> boardStandardToResponseDto(List<BoardStandard> boardStandards){
        if (boardStandards == null) {
            return null;
        }

        List<BoardStandardDto.Response> list = new ArrayList<>(boardStandards.size());
        for (BoardStandard boardStandard : boardStandards) {
            list.add(boardStandardToResponseDto(boardStandard));
        }

        return list;
    }

    MemberDto.Response memberToMemberResponse(Member member);
}