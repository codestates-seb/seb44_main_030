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
    private Long boardClubTagId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "BOARD_CLUB_ID")
    private BoardClub boardClub;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
}