package com.splashzone.dolphin;

import com.splashzone.dolphin.Dolphin.DolphinStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DolphinDto {
    private Long dolphinId;
    private Long score;
    private DolphinStatus dolphinStatus;
    private Long memberId;
}
