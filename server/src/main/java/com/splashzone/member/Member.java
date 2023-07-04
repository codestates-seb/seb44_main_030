package com.splashzone.member;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
@Entity
public class Member {
    @Id
    @GeneratedValue
    private long memberId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

//    @Column(nullable = false)
//    private Image;

    @Column(nullable = true)
    private String bio;


    @Column(nullable = false)
    private LocalDateTime registeredAt;

    private LocalDateTime terminatedAt;

    @Column(nullable = false)
    private boolean memberStatus;

    public Member(MemberDto memberDto) {
        this.name = memberDto.getName();
        this.email = memberDto.getEmail();
        this.password = memberDto.getPassword();
        this.bio = memberDto.getBio();
    }
}
