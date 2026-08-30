package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.BanRequest;
import com.npq.quanlynhahangapis.service.BanService;
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

    @GetMapping({"/tables", "/ban"})
    public ResponseEntity<?> danhSachTatCaBan(
            @RequestParam(required = false) Integer branchId,
            @RequestParam(required = false) Integer maChiNhanh,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String trangThai
    ) {
        Integer cId = branchId != null ? branchId : maChiNhanh;
        String s = status != null ? status : trangThai;
        return ResponseEntity.ok(banService.layDSBanTheoTrangThai(cId, s));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/ban")
    public ResponseEntity<?> danhSachBan(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(banService.layDSBan(maChiNhanh));
    }

    @GetMapping({"/tables/{maBan}", "/ban/{maBan}"})
    public ResponseEntity<?> chiTietBan(@PathVariable Integer maBan) {
        return ResponseEntity.ok(banService.layBanTheoId(maBan));
    }

    @PostMapping({"/tables", "/ban"})
    public ResponseEntity<?> taoBan(@RequestBody BanRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(banService.taoBan(request));
    }

    @PutMapping({"/tables/{maBan}", "/ban/{maBan}"})
    public ResponseEntity<?> capNhatBan(@PathVariable Integer maBan, @RequestBody BanRequest request) {
        return ResponseEntity.ok(banService.capNhatBan(maBan, request));
    }

    @PatchMapping({"/tables/{maBan}/trang-thai", "/tables/{maBan}/status"})
    public ResponseEntity<?> doiTrangThaiBan(
            @PathVariable Integer maBan,
            @RequestBody Map<String, String> body
    ) {
        String trangThai = body.getOrDefault("trangThai", body.get("status"));
        return ResponseEntity.ok(banService.doiTrangThaiBan(maBan, trangThai));
    }

    @DeleteMapping({"/tables/{maBan}", "/ban/{maBan}"})
    public ResponseEntity<?> xoaBan(@PathVariable Integer maBan) {
        banService.xoaBan(maBan);
        return ResponseEntity.noContent().build();
    }
}
