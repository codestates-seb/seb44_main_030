package com.splashzone.member.mapper;

import com.splashzone.boardclub.dto.BoardClubDto;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclubcomment.dto.BoardClubCommentDto;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardstandard.dto.BoardStandardDto;
import com.splashzone.boardstandard.entity.BoardStandard;
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

    BoardStandardDto.Response boardStandardToBoardStandardResponse(BoardStandard boardStandard);

    BoardClubDto.Response boardClubToBoardClubResponse(BoardClub boardClub);

    BoardClubCommentDto.Response boardClubCommentToBoardClubCommentResponse(BoardClubComment boardClubComment);

    TrackerDto.Response trackerTotrackerResponse(Tracker tracker);
}
