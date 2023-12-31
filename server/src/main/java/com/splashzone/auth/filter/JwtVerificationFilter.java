package com.splashzone.auth.filter;

import com.splashzone.auth.jwt.JwtTokenizer;
import com.splashzone.auth.userdetails.MemberDetails;
import com.splashzone.auth.userdetails.MemberDetailsService;
import com.splashzone.auth.utils.CustomAuthorityUtils;
import com.splashzone.member.entity.Member;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import io.jsonwebtoken.security.SignatureException;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getMethod().equals("OPTIONS")) {
            return;
        }
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }


    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        System.out.println(claims);
        return claims;
    }

    //TODO 이 메서드 다시 확인해보기
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        System.out.println("\n*\n*\n*\n*\n*\n setAuthenticationToContext - claims: " + claims);
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        List<String> roles = new ArrayList<>();
        authorities.forEach(s -> roles.add(s.getAuthority()));

        Member member = Member.builder()
                .email(username)
                .roles(roles).build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(new MemberDetails(authorityUtils, member), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        System.out.println("setAuthenticationToContext - authentication: " + authentication);


    }

}