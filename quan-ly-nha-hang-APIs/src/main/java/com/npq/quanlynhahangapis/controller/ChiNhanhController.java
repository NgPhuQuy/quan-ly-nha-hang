package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.ChiNhanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChiNhanhController {

    private final ChiNhanhService chiNhanhService;

    @GetMapping("/chi-nhanh")
    ResponseEntity<?> danhSachChiNhanh() {
        return ResponseEntity.ok(chiNhanhService.layDSChiNhanh());
    }
}
