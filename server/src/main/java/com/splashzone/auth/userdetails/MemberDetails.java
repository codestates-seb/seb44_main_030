package com.splashzone.auth.userdetails;

import com.splashzone.auth.utils.CustomAuthorityUtils;
import com.splashzone.member.entity.Member;
import com.splashzone.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;



public class MemberDetails extends Member implements UserDetails {
    private final CustomAuthorityUtils authorityUtils;
    public MemberDetails(CustomAuthorityUtils authorityUtils) {
        this.authorityUtils = authorityUtils;
    }


    public MemberDetails(CustomAuthorityUtils authorityUtils, Member member) {
        this.authorityUtils = authorityUtils;
        setMemberId(member.getMemberId());
        setEmail(member.getEmail());
        setName(member.getName());
        setPassword(member.getPassword());
        setBio(member.getBio());
        setNickname(member.getNickname());
        setRoles(member.getRoles());
        setCreatedAt(member.getTerminatedAt());
        if (member.getTerminatedAt() != null) setTerminatedAt(member.getTerminatedAt());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorityUtils.createAuthorities(this.getRoles());
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
