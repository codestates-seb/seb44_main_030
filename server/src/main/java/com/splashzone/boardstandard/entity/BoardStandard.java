package com.splashzone.boardstandard.entity;

import com.splashzone.member.entity.Member;
import com.splashzone.audit.Auditable;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class BoardStandard extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long standardId;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Column(name = "VIEW", nullable = false, columnDefinition = "integer default 0")
    private int view;

    //TODO tagId mapping,likeCount 추가 해야됨!!

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    public BoardStandard(long standardId, String title, String content, int view) {
        this.standardId = standardId;
        this.title = title;
        this.content = content;
        this.view = view;
    }

    public void changeBoardStandard(BoardStandard boardStandard) {
        if (!boardStandard.getTitle().isEmpty()) {
            this.title = boardStandard.getTitle();
        }
        if (!boardStandard.getContent().isEmpty()) {
            this.content = boardStandard.getContent();
        }
    }
}
