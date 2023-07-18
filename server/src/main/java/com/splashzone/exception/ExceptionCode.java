package com.splashzone.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    MEMBER_EMAIL_EXISTS(409, "Email exists"),
    BOARD_STANDARD_NOT_FOUND(404, "Board standard not found"),
    BOARD_CLUB_NOT_FOUND(404, "Board club not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    TAG_NOT_FOUND(404, "Tag not found"),
    TRACKER_NOT_FOUND(404, "Tracker not found"),
    DOLPHIN_NOT_FOUND(404, "Dolphin not found");

    private final int status;
    private final String message;

    ExceptionCode(int statusCode, String message){
        this.status = statusCode;
        this.message = message;
    }
}
