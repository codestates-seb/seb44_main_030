package com.splashzone.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    public static URI createUri(String defaultUrl, Long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl + "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }
}
