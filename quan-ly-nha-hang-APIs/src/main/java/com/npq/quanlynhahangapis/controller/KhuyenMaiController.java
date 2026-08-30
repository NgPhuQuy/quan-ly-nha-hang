package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.KhuyenMaiRequest;
import com.npq.quanlynhahangapis.service.KhuyenMaiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class KhuyenMaiController {
    private final KhuyenMaiService khuyenMaiService;

    @GetMapping({"/promotions", "/khuyen-mai"})
    public ResponseEntity<?> danhSachKhuyenMai(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String trangThai
    ) {
        String s = status != null ? status : trangThai;
        return ResponseEntity.ok(khuyenMaiService.layDSKhuyenMai(s));
    }

    @GetMapping({"/promotions/{maKhuyenMai}", "/khuyen-mai/{maKhuyenMai}"})
    public ResponseEntity<?> chiTietKhuyenMai(@PathVariable Integer maKhuyenMai) {
        return ResponseEntity.ok(khuyenMaiService.layTheoId(maKhuyenMai));
    }

    @PostMapping({"/promotions", "/khuyen-mai"})
    public ResponseEntity<?> taoKhuyenMai(@RequestBody KhuyenMaiRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(khuyenMaiService.taoKhuyenMai(request));
    }

    @PutMapping({"/promotions/{maKhuyenMai}", "/khuyen-mai/{maKhuyenMai}"})
    public ResponseEntity<?> capNhatKhuyenMai(
            @PathVariable Integer maKhuyenMai,
            @RequestBody KhuyenMaiRequest request
    ) {
        return ResponseEntity.ok(khuyenMaiService.capNhatKhuyenMai(maKhuyenMai, request));
    }

    @PatchMapping({"/promotions/{maKhuyenMai}/status", "/promotions/{maKhuyenMai}/trang-thai", "/khuyen-mai/{maKhuyenMai}/trang-thai"})
    public ResponseEntity<?> doiTrangThai(
            @PathVariable Integer maKhuyenMai,
            @RequestBody Map<String, String> body
    ) {
        String trangThai = body.getOrDefault("trangThai", body.get("status"));
        return ResponseEntity.ok(khuyenMaiService.doiTrangThai(maKhuyenMai, trangThai));
    }

    @DeleteMapping({"/promotions/{maKhuyenMai}", "/khuyen-mai/{maKhuyenMai}"})
    public ResponseEntity<?> xoaKhuyenMai(@PathVariable Integer maKhuyenMai) {
        khuyenMaiService.xoaKhuyenMai(maKhuyenMai);
        return ResponseEntity.noContent().build();
    }
}

