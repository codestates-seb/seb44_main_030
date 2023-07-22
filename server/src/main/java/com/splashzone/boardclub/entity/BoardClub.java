package com.splashzone.boardclub.entity;

import com.splashzone.audit.Auditable;
import com.splashzone.boardclubcomment.entity.BoardClubComment;
import com.splashzone.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class BoardClub extends Auditable {
    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardClubId;

    @Column(name = "TITLE", nullable = false, length = 100)
    private String title;

    @Column(name = "CONTENT", nullable = false)
    @Lob
    private String content;

    @Column(name = "DUE_DATE", nullable = false)
    private LocalDate dueDate; // 모집일이 지나면 자동으로 모집 종료되게 처리, 현재보다 이전일은 지정 못하게 처리

    @Column(name = "CAPACITY", nullable = false)
    private Integer capacity;

    @Column(name = "CONTACT", nullable = false, length = 100)
    private String contact;

    @Column(name = "PLACE_NAME", nullable = false)
    private String placeName;

    @Column(name = "ADDRESS_NAME", nullable = false)
    private String addressName;

    @Column(name = "LATITUDE", nullable = false)
    private Double latitude;

    @Column(name = "LONGITUDE", nullable = false)
    private Double longitude;

    @Column(name = "VIEW", nullable = false, columnDefinition = "integer default 0")
    private int view;

    @Enumerated(value = EnumType.STRING)
    @Builder.Default
    @Column(name = "BOARD_CLUB_STATUS", nullable = false)
    private BoardClubStatus boardClubStatus = BoardClubStatus.BOARD_CLUB_RECRUITING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Builder.Default
    @OneToMany(mappedBy = "boardClub", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<BoardClubTag> boardClubTags = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "boardClub", cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<BoardClubComment> boardClubComments = new ArrayList<>();

//    @Builder.Default
//    @OneToMany(mappedBy = "boardClub")
//    private List<Like> likes = new ArrayList<>();

    @Column(name = "LIKE_COUNT", nullable = true)
    private int likeCount;

    public enum BoardClubStatus {
        BOARD_CLUB_RECRUITING("모집 중"),
        BOARD_CLUB_COMPLETED("모집 완료"),
        BOARD_CLUB_CANCEL("모집 취소");

        @Getter
        private String status;

        BoardClubStatus(String status) {
            this.status = status;
        }
    }

    public void changeBoardClub(BoardClub boardClub, List<BoardClubTag> clubTags) {
        this.title = boardClub.getTitle();
        this.content = boardClub.getContent();
        this.dueDate = boardClub.getDueDate();
        this.capacity = boardClub.getCapacity();
        this.contact = boardClub.getContact();

        this.placeName = boardClub.getPlaceName();
        this.addressName = boardClub.getAddressName();
        this.latitude = boardClub.getLatitude();
        this.longitude = boardClub.getLongitude();

        this.boardClubStatus = boardClub.getBoardClubStatus();

        this.boardClubTags.clear();
        this.boardClubTags.addAll(clubTags);
    }

    public void changeBoardClubStatus(BoardClubStatus boardClubStatus) {
        this.boardClubStatus = boardClubStatus;
    }

    public void increaseLikeCount() {
        this.likeCount += 1;
    }

    public void decreaseLikeCount() {
        this.likeCount -= 1;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}