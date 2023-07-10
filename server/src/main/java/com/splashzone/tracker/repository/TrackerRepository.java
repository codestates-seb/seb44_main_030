package com.splashzone.tracker.repository;

import com.splashzone.tracker.entity.Tracker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackerRepository extends JpaRepository<Tracker, Long> {
}
