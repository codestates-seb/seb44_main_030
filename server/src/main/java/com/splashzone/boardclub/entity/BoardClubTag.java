package com.splashzone.boardclub.entity;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.tag.entity.Tag;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class BoardClubTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardClubTagId;

    @ManyToOne
    @JoinColumn(name = "BOARD_CLUB_ID")
    private BoardClub boardClub;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void addBoardClub(BoardClub boardClub) {
        this.boardClub = boardClub;
        if (!this.boardClub.getBoardClubTags().contains(this)) {
            this.boardClub.getBoardClubTags().add(this);
        }
    }

    public void addTag(Tag tag) {
        this.tag = tag;
        if (!this.tag.getBoardClubTags().contains(this)) {
            this.tag.getBoardClubTags().add(this);
        }
    }
}