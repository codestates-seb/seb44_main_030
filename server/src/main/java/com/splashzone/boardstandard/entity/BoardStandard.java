package com.splashzone.boardstandard.entity;

import com.splashzone.member.entity.Member;
import com.splashzone.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BoardStandard extends Auditable {
    @Id
    @GeneratedValue
    private long standardId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime modifiedAt;

    @Column
    private long view = 0L;

    //TODO tagId mapping,likeCount 추가 해야됨!!

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;


    public BoardStandard(long standardId, String title, String content, long view) {
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
