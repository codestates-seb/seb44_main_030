package com.splashzone.boardclub.entity;

import com.splashzone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class BoardClubLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardClubLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_CLUB_ID")
    private BoardClub boardClub;

    @Column(name = "CLUB_LIKE_STATUS", nullable = false)
    private boolean clubLikeStatus; // true = 좋아요, false = 좋아요 취소

    public BoardClubLike(BoardClub boardClub, Member member) {
        this.boardClub = boardClub;
        this.member = member;
        this.clubLikeStatus = true;
    }
}
