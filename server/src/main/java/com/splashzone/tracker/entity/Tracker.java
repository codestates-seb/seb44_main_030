package com.splashzone.tracker.entity;

import com.splashzone.audit.Auditable;
import com.splashzone.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class Tracker extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trackerId;

//    @Column(name = "TRACKER_DATE", nullable = false)
//    private LocalDate trackerDate;

    @Column(name = "TITLE", nullable = false, length = 100)
    private String title;

    @Column(name = "CONTENT", nullable = false, length = 200)
    private String content;

    @Column(name = "EXERCISE_START_TIME", nullable = false)
    private String exerciseStartTime;

    @Column(name = "EXERCISE_END_TIME", nullable = false)
    private String exerciseEndTime;

    @Column(name = "EXERCISE_TIME", nullable = false)
    private Long exerciseTime;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }

    public Long calculateExerciseTime(String exerciseStartTime, String exerciseEndTime) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("YYYYMMddHHmm");

        // String -> Date
        Date startDate = dateFormat.parse(exerciseStartTime);
        Date endDate = dateFormat.parse(exerciseEndTime);

        // Date -> 밀리세컨즈
        Long startDateTime = startDate.getTime();
        Long endDateTime = endDate.getTime();

        Long diff = endDateTime - startDateTime;
        Long diffMin = diff / (1000 * 60);

        return diffMin;
    }

    public void changeTracker(Tracker tracker) throws ParseException {
        if (!tracker.getTitle().isEmpty()) {
            this.title = tracker.getTitle();
        }
        if (!tracker.getContent().isEmpty()) {
            this.content = tracker.getContent();
        }
        if (!tracker.getExerciseStartTime().isEmpty()) {
            this.exerciseStartTime = tracker.getExerciseStartTime();
        }
        if (!tracker.getExerciseEndTime().isEmpty()) {
            this.exerciseEndTime = tracker.getExerciseEndTime();
        }

        this.exerciseTime = calculateExerciseTime(exerciseStartTime, exerciseEndTime);
    }
}
