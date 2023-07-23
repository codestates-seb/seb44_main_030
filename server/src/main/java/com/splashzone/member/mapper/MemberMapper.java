package com.splashzone.member.mapper;

import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandardcomment.dto.BoardStandardCommentDto;
import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.member.dto.MemberDto;
import com.splashzone.member.entity.Member;
import com.splashzone.tracker.dto.TrackerDto;
import com.splashzone.tracker.entity.Tracker;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostToMember(MemberDto.Post requestBody);

    Member memberPatchToMember(MemberDto.Patch requestBody);

    MemberDto.Response memberToMemberResponse(Member member);

    List<MemberDto.Response> membersToMemberResponses(List<Member> members);

    BoardStandardDto.Response boardStandardToBoardStandardResponseDto(BoardStandard boardStandard);

    default BoardStandardCommentDto.Response boardStandardCommentToBoardStandardCommentResponseDto(BoardStandardComment boardStandardComment){
        return BoardStandardCommentDto.Response.builder()
                .boardStandardCommentId(boardStandardComment.getBoardStandardCommentId())
                .memberId(boardStandardComment.getMember().getMemberId())
                .boardStandardId(boardStandardComment.getBoardStandard().getBoardStandardId())
                .content(boardStandardComment.getContent())
                .createdAt(boardStandardComment.getCreatedAt())
                .modifiedAt(boardStandardComment.getModifiedAt())
                .build();
    }

    BoardClubDto.Response boardClubToBoardClubResponseDto(BoardClub boardClub);
}
