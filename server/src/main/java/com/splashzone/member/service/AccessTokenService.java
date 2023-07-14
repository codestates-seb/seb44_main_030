package com.splashzone.member.service;

import com.splashzone.member.entity.AccessToken;
import com.splashzone.member.repository.AccessTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.spec.OAEPParameterSpec;
import javax.persistence.Access;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AccessTokenService {
    private final AccessTokenRepository accessTokenRepository;

    @Transactional
    public AccessToken addAccessToken(AccessToken accessToken) {
        return accessTokenRepository.save(accessToken);
    }

    public AccessToken findToken(String value) {
        Optional<AccessToken> optionalAccessToken = accessTokenRepository.findByTokenValue(value);
        AccessToken rt = optionalAccessToken.get();
        return rt;
    }

    public void deleteAccessToken(String accessToken) {
        AccessToken accessToken1 = findToken(accessToken);
        accessTokenRepository.delete(accessToken1);
    }

    @Transactional
    public Optional<AccessToken> findAccessToken(String accessToken) {
        return accessTokenRepository.findByTokenValue(accessToken);
    }
}
