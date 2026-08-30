package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class KhachHangController {
    private final KhachHangService khachHangService;

    @GetMapping({"/customers", "/khach-hang"})
    public ResponseEntity<?> danhSachKhachHang(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String search
    ) {
        String s = keyword != null ? keyword : search;
        return ResponseEntity.ok(khachHangService.layDSKhachHang(s));
    }

    @GetMapping({"/customers/{maKhachHang}", "/khach-hang/{maKhachHang}"})
    public ResponseEntity<?> chiTietKhachHang(@PathVariable Integer maKhachHang) {
        return ResponseEntity.ok(khachHangService.layKhachHangTheoId(maKhachHang));
    }
}

