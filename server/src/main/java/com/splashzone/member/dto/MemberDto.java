package com.splashzone.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    public static class Response {
        private long memberId;
        private String name;
        private String email;
        private String nickname;
        private String bio;
    }

    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank(message = "공백이 아니어야 합니다.")
        @Size(min = 1, max = 30, message = "이름 길이는 최대 30입니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Pattern(regexp = "^[A-Za-z\\d!@#$%^&*()_+~\\-=]{8,40}$")
        private String password;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Size(min = 1, max = 30, message = "이름 길이는 최대 30입니다.")
        private String nickname;

        private String bio;
    }

    @Getter
    public static class Patch {
        private long memberId;

//        email, name 모두 수정 불가능
//        @NotBlank(message = "공백이 아니어야 합니다.")
//        @Size(min = 1, max = 30, message = "이름 길이는 최대 30입니다.")
//        private String name;
//
//        @Email(message = "이메일 형식이 올바르지 않습니다.")
//        private String email;

        private String nickname;
        private String bio;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }
}
