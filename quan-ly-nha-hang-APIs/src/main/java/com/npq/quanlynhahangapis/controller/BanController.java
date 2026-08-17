package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.BanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class BanController {
    private final BanService banService;

    @GetMapping("/khu-vuc/{maKhuVuc}/ban")
    ResponseEntity<?> danhSachBan(@PathVariable Integer maKhuVuc) {
        return ResponseEntity.ok(banService.layDSBan(maKhuVuc));
    }
}
