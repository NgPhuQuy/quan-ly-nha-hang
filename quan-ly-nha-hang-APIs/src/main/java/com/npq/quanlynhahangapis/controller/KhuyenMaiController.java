package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.KhuyenMaiRequest;
import com.npq.quanlynhahangapis.service.KhuyenMaiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/khuyen-mai")
@RequiredArgsConstructor
public class KhuyenMaiController {
    private final KhuyenMaiService khuyenMaiService;

    @GetMapping
    public ResponseEntity<?> danhSachKhuyenMai(@RequestParam(required = false) String trangThai) {
        return ResponseEntity.ok(khuyenMaiService.layDSKhuyenMai(trangThai));
    }

    @GetMapping("/{maKhuyenMai}")
    public ResponseEntity<?> chiTietKhuyenMai(@PathVariable Integer maKhuyenMai) {
        return ResponseEntity.ok(khuyenMaiService.layTheoId(maKhuyenMai));
    }

    @PostMapping
    public ResponseEntity<?> taoKhuyenMai(@RequestBody @Valid KhuyenMaiRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(khuyenMaiService.taoKhuyenMai(request));
    }

    @PutMapping("/{maKhuyenMai}")
    public ResponseEntity<?> capNhatKhuyenMai(
            @PathVariable Integer maKhuyenMai,
            @RequestBody @Valid KhuyenMaiRequest request
    ) {
        return ResponseEntity.ok(khuyenMaiService.capNhatKhuyenMai(maKhuyenMai, request));
    }

    @PatchMapping("/{maKhuyenMai}/trang-thai")
    public ResponseEntity<?> doiTrangThai(
            @PathVariable Integer maKhuyenMai,
            @RequestBody Map<String, String> body
    ) {
        String trangThai = body.getOrDefault("trangThai", body.get("status"));
        return ResponseEntity.ok(khuyenMaiService.doiTrangThai(maKhuyenMai, trangThai));
    }

    @DeleteMapping("/{maKhuyenMai}")
    public ResponseEntity<?> xoaKhuyenMai(@PathVariable Integer maKhuyenMai) {
        khuyenMaiService.xoaKhuyenMai(maKhuyenMai);
        return ResponseEntity.noContent().build();
    }
}

