package com.splashzone.dolphin;

import com.splashzone.exception.BusinessLogicException;
import com.splashzone.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DolphinService {
    private final DolphinRepository dolphinRepository;

    @Autowired
    public DolphinService(DolphinRepository dolphinRepository) {
        this.dolphinRepository = dolphinRepository;
    }

    public DolphinDto getDolphinById(Long dolphinId) {
        Optional<Dolphin> optionalDolphin = dolphinRepository.findById(dolphinId);
        Dolphin dolphin = optionalDolphin.orElseThrow(() -> new BusinessLogicException(ExceptionCode.DOLPHIN_NOT_FOUND));

        return DolphinDto.builder()
                .dolphinId(dolphin.getDolphinId())
                .score(dolphin.getScore())
                .dolphinStatus(dolphin.getDolphinStatus())
                .memberId(dolphin.getMember().getMemberId())
                .build();
    }
}