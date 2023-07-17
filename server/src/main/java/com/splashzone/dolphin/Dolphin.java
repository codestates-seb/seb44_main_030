package com.splashzone.dolphin;

import com.splashzone.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
public class Dolphin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dolphinId;

    @Column(name = "SCORE", nullable = false)
    private Long score;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "DOLPHIN_STATUS", nullable = false)
    private DolphinStatus dolphinStatus = DolphinStatus.Level_1;

    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public enum DolphinStatus {
        Level_1("level_1"),
        Level_2("level_2"),
        Level_3("level_3");

        @Getter
        private String status;


        DolphinStatus(String status) { this.status = status;}
    }
    public Dolphin(Member member) {
        this.score = 0L;
        this.dolphinStatus = getDolphinStatus();
        this.member = member;
    }
}
