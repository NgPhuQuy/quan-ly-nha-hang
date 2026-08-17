package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.KhuVucService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class KhuVucController {
    private final KhuVucService khuVucService;

    @GetMapping("/chi-nhanh/{maChiNhanh}/khu-vuc")
    ResponseEntity<?> danhSachKhuVuc(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(khuVucService.layDSKhuVuc(maChiNhanh));
    }
}
