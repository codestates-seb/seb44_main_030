package com.splashzone.tag.service;

import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import com.splashzone.tag.entity.Tag;
import com.splashzone.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public Tag findVerifiedTagByTagName(Tag.TagName tagName) {
        return tagRepository.findByTagName(tagName)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
    }

    public Tag findTagById(Long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);

        Tag findTag =
                optionalTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return findTag;
    }
}