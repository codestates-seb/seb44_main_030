package com.splashzone.boardstandard.entity;

import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.member.entity.Member;
import com.splashzone.audit.Auditable;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@Entity
public class BoardStandard extends Auditable {
    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardStandardId;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "CONTENT", nullable = false)
    private String content;

    @Setter
    @Column(name = "VIEW", nullable = false, columnDefinition = "integer default 0")
    private int view;

    @Column(name = "LIKE_COUNT", nullable = true)
    private int likeCount;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "boardStandard", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<BoardStandardComment> boardStandardComments = new ArrayList<>();

    public BoardStandard(Long boardStandardId, String title, String content, int view) {
        this.boardStandardId = boardStandardId;
        this.title = title;
        this.content = content;
        this.view = view;
    }

    public void changeBoardStandard(BoardStandard boardStandard) {
        this.title = boardStandard.getTitle();
        this.content = boardStandard.getContent();
    }

    public void increaseLikeCount() {
        this.likeCount += 1;
    }

    public void decreaseLikeCount() {
        this.likeCount -= 1;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}