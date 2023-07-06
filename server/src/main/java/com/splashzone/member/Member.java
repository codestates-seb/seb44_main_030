package com.splashzone.member;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}
