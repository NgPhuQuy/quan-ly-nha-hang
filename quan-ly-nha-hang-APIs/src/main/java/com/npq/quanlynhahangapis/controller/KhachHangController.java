package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/khach-hang")
@RequiredArgsConstructor
public class KhachHangController {
    private final KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<?> danhSachKhachHang(@RequestParam(required = false) String keyword) {
        return ResponseEntity.ok(khachHangService.layDSKhachHang(keyword));
    }

    @GetMapping("/{maKhachHang}")
    public ResponseEntity<?> chiTietKhachHang(@PathVariable Integer maKhachHang) {
        return ResponseEntity.ok(khachHangService.layKhachHangTheoId(maKhachHang));
    }
}

