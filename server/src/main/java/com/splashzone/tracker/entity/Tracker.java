package com.splashzone.tracker.entity;

import com.splashzone.audit.Auditable;
import com.splashzone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
public class Tracker extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trackerId;

    @Column(nullable = false)
    private LocalDate trackerDate;

    private String title;

    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
