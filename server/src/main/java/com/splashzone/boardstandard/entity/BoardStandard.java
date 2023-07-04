package com.splashzone.boardstandard.entity;

import com.splashzone.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @Column
    private long view = 0L;

    //TODO memberId, tagId mapping,likeCount 추가 해야됨!!

    public BoardStandard(long standardId, String title, String content, long view) {
        this.standardId = standardId;
        this.title = title;
        this.content = content;
        this.view = view;
    }
}
