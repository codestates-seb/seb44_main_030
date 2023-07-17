package com.splashzone.dolphin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dolphins")
public class DolphinController {
    private final DolphinService dolphinService;

    @Autowired
    public DolphinController(DolphinService dolphinService) {
        this.dolphinService = dolphinService;
    }

    @GetMapping("/{dolphinId}")
    public ResponseEntity<DolphinDto> getDolphinById(@PathVariable Long dolphinId) {
        DolphinDto dolphinDto = dolphinService.getDolphinById(dolphinId);
        return ResponseEntity.ok(dolphinDto);
    }
}
