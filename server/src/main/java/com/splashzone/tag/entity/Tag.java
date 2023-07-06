package com.splashzone.tag.entity;

import com.splashzone.boardclub.entity.BoardClubTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tagId;

    @Enumerated(EnumType.STRING)
    private TagName tagName;

    @Builder.Default
    @OneToMany(mappedBy = "tag")
    private List<BoardClubTag> boardClubTags = new ArrayList<>();

    public enum TagName {
        SWIMMING("수영"),
        SURFING("서핑"),
        SNORKELING("스노쿨링"),
        SCUBA_DIVING("스쿠버 다이빙"),
        WATER_SKIING("수상스키"),
        JET_SKIING("제트스키"),
        WINDSURFING("윈드서핑"),
        KITESURFING("카이트서핑"),
        FLYBOARDING("플라이보드"),
        PARASAILING("패러세일링"),
        PADDLING("패들보트"),
        KAYAKING("카약");

        @Getter
        private String name;

        TagName(String name) {
            this.name = name;
        }
    }
}