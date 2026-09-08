package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.BanRequest;
import com.npq.quanlynhahangapis.service.BanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
public class BanController {
    private final BanService banService;

    @GetMapping("/ban")
    public ResponseEntity<?> danhSachTatCaBan() {
        return ResponseEntity.ok(banService.layDSBan());
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/ban")
    public ResponseEntity<?> danhSachBanCuaChiNhanh(@PathVariable Integer maChinhanh) {
        return ResponseEntity.ok(banService.layDSBanCuaChiNhanh(maChinhanh));
    }

    @GetMapping("/ban/{maBan}")
    public ResponseEntity<?> chiTietBan(@PathVariable Integer maBan) {
        return ResponseEntity.ok(banService.chiTietBan(maBan));
    }

    @PostMapping("/ban")
    public ResponseEntity<?> taoBan(@RequestBody BanRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(banService.taoBan(request));
    }

    @PatchMapping("/ban/{maBan}/trang-thai")
    public ResponseEntity<?> doiTrangThaiBan(@PathVariable Integer maBan) {
        return ResponseEntity.ok(banService.doiTrangThaiBan(maBan));
    }
}
