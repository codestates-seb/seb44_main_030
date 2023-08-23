package com.splashzone.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_EMAIL_EXISTS(409, "Email exists"),
    BOARD_STANDARD_NOT_FOUND(404, "Board standard not found"),
    BOARD_CLUB_NOT_FOUND(404, "Board club not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    TAG_NOT_FOUND(404, "Tag not found"),
    LIKE_EXISTS(409, "Like exists"),
    LIKE_NOT_FOUND(404, "Like not found"),
    TRACKER_NOT_FOUND(404, "Tracker not found"),
    INVALID_DATE_FORMAT(400, "Invalid date format"),
    DOLPHIN_NOT_FOUND(404, "Dolphin not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}