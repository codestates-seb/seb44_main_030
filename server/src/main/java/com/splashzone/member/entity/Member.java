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

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "NICKNAME", nullable = false)
    private String nickname;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "PASSWORD", nullable = false, length = 100)
    private String password;

//    @Column(nullable = false)
//    private Image;

    @Column(name = "BIO", nullable = true)
    private String bio;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "TERMINATED_AT", nullable = true)
    private LocalDateTime terminatedAt;

    @Column(name = "ISTERMINATED", nullable = false)
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
}
