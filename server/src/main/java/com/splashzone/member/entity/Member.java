package com.splashzone.member.entity;

import com.splashzone.boardclub.entity.BoardClub;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.boardstandard.entity.BoardStandard;
import com.splashzone.boardstandardcomment.entity.BoardStandardComment;
import com.splashzone.tracker.entity.Tracker;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "NICKNAME", nullable = false, unique = true)
    private String nickname;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;


    @Column(name = "PASSWORD", nullable = false, length = 100)

    private String password;

    @Column(name = "PROFILE_IMAGE_URL", nullable = true)
    private String profileImageUrl;

    @Column(name = "BIO", nullable = true)
    private String bio;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;


    @Column(name = "MODIFIED_AT", nullable = true)
    private LocalDateTime modifiedAt;


    @Column(name = "TERMINATED_AT", nullable = true)
    private LocalDateTime terminatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "MEMBER_STATUS", nullable = false)
    private MemberStatus memberStatus;

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<BoardStandard> boardStandards = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<BoardClub> boardClubs = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<BoardStandardComment> boardStandardComments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<BoardClubComment> boardClubComments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<Tracker> trackers = new ArrayList<>();

//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
//    private Dolphin dolphin;

    public enum MemberStatus {
        ACTIVE("활동 중"),
        TERMINATED("탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public Member(String email, String name, String password, String nickname, String profileImageUrl) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.memberStatus = MemberStatus.ACTIVE;
        this.profileImageUrl = "image/default.png";
    }

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}