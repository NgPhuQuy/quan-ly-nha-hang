package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.BanRequest;
import com.npq.quanlynhahangapis.service.BanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class BanController {
    private final BanService banService;

    @GetMapping("/ban")
    public ResponseEntity<?> danhSachTatCaBan(@RequestParam Integer maChiNhanh) {
        return ResponseEntity.ok(banService.layDSBan(maChiNhanh));
    }

//    @GetMapping("/chi-nhanh/{maChiNhanh}/ban")
//    public ResponseEntity<?> danhSachBan(@PathVariable Integer maChiNhanh) {
//        return ResponseEntity.ok(banService.layDSBan(maChiNhanh));
//    }

    @GetMapping("/ban/{maBan}")
    public ResponseEntity<?> chiTietBan(@PathVariable Integer maBan) {
        return ResponseEntity.ok(banService.layBanTheoId(maBan));
    }

    @PostMapping("/ban")
    public ResponseEntity<?> taoBan(@RequestBody @Valid BanRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(banService.taoBan(request));
    }

    @PutMapping("/ban/{maBan}")
    public ResponseEntity<?> capNhatBan(@PathVariable Integer maBan, @RequestBody @Valid BanRequest request) {
        return ResponseEntity.ok(banService.capNhatBan(maBan, request));
    }

    @PatchMapping("/ban/{maBan}/trang-thai")
    public ResponseEntity<?> doiTrangThaiBan(
            @PathVariable Integer maBan,
            @RequestBody Map<String, String> body
    ) {
        String trangThai = body.getOrDefault("trangThai", body.get("status"));
        return ResponseEntity.ok(banService.doiTrangThaiBan(maBan, trangThai));
    }

    @DeleteMapping("/ban/{maBan}")
    public ResponseEntity<?> xoaBan(@PathVariable Integer maBan) {
        banService.xoaBan(maBan);
        return ResponseEntity.noContent().build();
    }
}
