package com.splashzone.auth.config;

import com.splashzone.auth.filter.JwtAuthenticationFilter;
import com.splashzone.auth.filter.JwtVerificationFilter;
import com.splashzone.auth.handler.MemberAccessDeniedHandler;
import com.splashzone.auth.handler.MemberAuthenticationEntryPoint;
import com.splashzone.auth.handler.MemberAuthenticationFailureHandler;
import com.splashzone.auth.handler.MemberAuthenticationSuccessHandler;
import com.splashzone.auth.jwt.JwtTokenizer;
import com.splashzone.auth.utils.CustomAuthorityUtils;
import com.splashzone.member.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;


//@EnableWebSecurity(debug = true)
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, @Lazy MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers(HttpMethod.POST, "/members").permitAll()
                                .antMatchers(HttpMethod.PATCH, "/members").hasRole("USER")
                                .antMatchers(HttpMethod.DELETE, "/members").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/standards").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/standards").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/standards").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/standards").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/clubs").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/clubs").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/clubs").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/clubs").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/clubcomments").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/clubcomments").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/clubcomments").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/clubcomments").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/standardcomments").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/standardcomments").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/standardcomments").permitAll()
                                .antMatchers(HttpMethod.DELETE, "/standardcomments").hasRole("USER")
                                .antMatchers(HttpMethod.POST, "/trackers").hasRole("USER")
                                .antMatchers(HttpMethod.PATCH, "/trackers").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/trackers").hasRole("USER")
                                .antMatchers(HttpMethod.DELETE, "/trackers").hasRole("USER")
//                        .antMatchers(HttpMethod.POST, "/standards").permitAll()
//                        .antMatchers(HttpMethod.POST, "/clubs").permitAll()
//                        .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/members").permitAll()
//                        .antMatchers(HttpMethod.GET, "/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
//                        .antMatchers(HttpMethod.POST, "/standards").authenticated()
//                        .antMatchers(HttpMethod.PATCH, "/standards/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/standards").permitAll()
//                        .antMatchers(HttpMethod.DELETE, "/standards/**").hasRole("USER")
//                        .antMatchers(HttpMethod.POST, "/clubs").authenticated()
//                        .antMatchers(HttpMethod.PATCH, "/clubs/**").hasRole("USER")
//                        .antMatchers(HttpMethod.GET, "/clubs").permitAll()
//                        .antMatchers(HttpMethod.DELETE, "/clubs/**").hasRole("USER")
                );
        return http.build();
    }

    // (7)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // (8)
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://jolly-kringle-b6ed45.netlify.app/",
                                                      "http://13.209.142.240:8080/",
                                                      "http://127.0.0.1:5173/",
                                                      "http://localhost:5173/",
                                                      "http://localhost:8080/",
                                                      "http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh", "MemberId"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}