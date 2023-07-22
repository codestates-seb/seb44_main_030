package com.splashzone.boardstandardcomment.mapper;

import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandardcomment.dto.BoardStandardCommentDto;
import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardStandardCommentMapper {
    default BoardStandardComment boardStandardCommentPostDtotoBoardStandardComment(BoardStandardCommentDto.Post requestBody, Member member) {
        BoardStandard boardStandard = new BoardStandard();
        boardStandard.setBoardStandardId(requestBody.getBoardStandardId());

        return BoardStandardComment.builder()
                .content(requestBody.getContent())
                .member(member)
                .boardStandard(boardStandard)
                .build();
    }

    default BoardStandardComment boardStandardCommentPatchDtotoBoardStandardComment(BoardStandardCommentDto.Patch requestBody, Long boardStandardCommentId, Member member) {
        BoardStandard boardStandard = new BoardStandard();
        boardStandard.setBoardStandardId(requestBody.getBoardStandardId());

        return BoardStandardComment.builder()
                .boardStandardCommentId(boardStandardCommentId)
                .content(requestBody.getContent())
                .member(member)
                .boardStandard(boardStandard)
                .build();
    }

    default BoardStandardCommentDto.Response boardStandardCommentToBoardStandardCommentResponseDto(BoardStandardComment boardStandardComment) {
        return BoardStandardCommentDto.Response.builder()
                .boardStandardCommentId(boardStandardComment.getBoardStandardCommentId())
                .memberId(boardStandardComment.getMember().getMemberId())
                .boardStandardId(boardStandardComment.getBoardStandard().getBoardStandardId())
                .content(boardStandardComment.getContent())
                .createdAt(boardStandardComment.getCreatedAt())
                .modifiedAt(boardStandardComment.getModifiedAt())
                .build();
    }

    default List<BoardStandardCommentDto.Response> boardStandardCommentsToBoardStandardCommentResponseDtos(List<BoardStandardComment> boardStandardComments) {
        List<BoardStandardCommentDto.Response> list = new ArrayList<>(boardStandardComments.size());
        for (BoardStandardComment boardStandardComment : boardStandardComments) {
            list.add(boardStandardCommentToBoardStandardCommentResponseDto(boardStandardComment));
        }
        return list;
    }
}
