package com.splashzone.boardclubcomment.mapper;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardClubCommentMapper {
    default BoardClubComment boardClubCommentPostDtotoBoardClubComment(BoardClubCommentDto.Post requestBody, Member member) {
//        Member member = new Member();
//        member.setMemberId(requestBody.getMemberId());

        BoardClub boardClub = new BoardClub();
        boardClub.setBoardClubId(requestBody.getBoardClubId());

        return BoardClubComment.builder()
                .content(requestBody.getContent())
                .member(member)
                .boardClub(boardClub)
                .build();
    }

    default BoardClubComment boardClubCommentPatchDtotoBoardClubComment(BoardClubCommentDto.Patch requestBody, Long boardClubCommentId, Member member) {
//        Member member = new Member();
//        member.setMemberId(requestBody.getMemberId());

        BoardClub boardClub = new BoardClub();
        boardClub.setBoardClubId(requestBody.getBoardClubId());

        return BoardClubComment.builder()
                .boardClubCommentId(boardClubCommentId)
                .content(requestBody.getContent())
                .member(member)
                .boardClub(boardClub)
                .build();
    }

    default BoardClubCommentDto.Response boardClubCommentToBoardClubCommentResponseDto(BoardClubComment boardClubComment) {
        return BoardClubCommentDto.Response.builder()
                .boardClubCommentId(boardClubComment.getBoardClubCommentId())
                .memberId(boardClubComment.getMember().getMemberId())
                .boardClubId(boardClubComment.getBoardClub().getBoardClubId())
                .content(boardClubComment.getContent())
                .createdAt(boardClubComment.getCreatedAt())
                .modifiedAt(boardClubComment.getModifiedAt())
                .build();
    }

    default List<BoardClubCommentDto.Response> boardClubCommentsToBoardClubCommentResponseDtos(List<BoardClubComment> boardClubComments) {
        List<BoardClubCommentDto.Response> list = new ArrayList<>(boardClubComments.size());
        for (BoardClubComment boardClubComment : boardClubComments) {
            list.add(boardClubCommentToBoardClubCommentResponseDto(boardClubComment));
        }
        return list;
    }
}
