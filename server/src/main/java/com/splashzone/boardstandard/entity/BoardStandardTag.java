package com.splashzone.boardstandard.entity;

import com.splashzone.tag.entity.Tag;
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
public class BoardStandardTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardStandardTagId;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "BOARD_STANDARD_ID")
    private BoardStandard boardStandard;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
}
