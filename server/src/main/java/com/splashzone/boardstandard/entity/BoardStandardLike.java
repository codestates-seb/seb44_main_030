package com.splashzone.boardstandard.entity;

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
public class BoardStandardLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardStandardLikeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_STANDARD_ID")
    private BoardStandard boardStandard;

    @Column(name = "STANDARD_LIKE_STATUS", nullable = false)
    private boolean standardLikeStatus; // true = 좋아요, false = 좋아요 취소

    public BoardStandardLike(BoardStandard boardStandard, Member member) {
        this.boardStandard = boardStandard;
        this.member = member;
        this.standardLikeStatus = true;
    }
}
