package com.splashzone.tracker.repository;

import com.splashzone.member.entity.Member;
import com.splashzone.tracker.entity.Tracker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackerRepository extends JpaRepository<Tracker, Long> {
    Page<Tracker> findByMember(Member member, Pageable pageable);
}
