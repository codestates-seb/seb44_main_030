package com.splashzone.boardclubcomment.entity;

import com.splashzone.audit.Auditable;
import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class BoardClubComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardClubCommentId;

    @Column(name = "CONTENT", nullable = false)
    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_CLUB_ID")
    private BoardClub boardClub;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public BoardClubComment changeContent(String newContent) {
        this.content = newContent;
        return this;
    }
}
