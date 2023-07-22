package com.splashzone.boardstandardcomment.entity;

import com.splashzone.audit.Auditable;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class BoardStandardComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardStandardCommentId;

    @Column(name = "CONTENT", nullable = false)
    @Lob
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BOARD_STANDARD_ID")
    private BoardStandard boardStandard;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public BoardStandardComment changeContent(String newContent) {
        this.content = newContent;
        return this;
    }
}
