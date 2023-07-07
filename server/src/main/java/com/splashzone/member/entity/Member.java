package com.splashzone.member.entity;

import com.splashzone.boardstandard.entity.BoardStandard;
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
    @GeneratedValue
    private long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false)
//    private Image;

    @Column(nullable = true)
    private String bio;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime terminatedAt;

    @Column(nullable = false)
    private boolean isTerminated;

    @Builder.Default
    @OneToMany(mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<BoardStandard> boardStandards = new ArrayList<>();

    public Member(String email, String name, String password, String nickname) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.nickname = nickname;
    }
}
