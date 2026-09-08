package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.HoaDonRequest;
import com.npq.quanlynhahangapis.service.HoaDonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoa-don")
@RequiredArgsConstructor
@PreAuthorize("hasRole('QUAN_LY') or hasRole('ADMIN')")
public class HoaDonController {
    private final HoaDonService hoaDonService;

    @PostMapping
    public ResponseEntity<?> taoHoaDon(@AuthenticationPrincipal Integer maQuanLy,
                                       @RequestBody @Valid HoaDonRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hoaDonService.taoHoaDon(maQuanLy, request));
    }

    @GetMapping
    public ResponseEntity<?> danhSachHoaDon() {
        return ResponseEntity.ok(hoaDonService.layDSHoaDon());
    }

    @GetMapping("/{maHoaDon}")
    public ResponseEntity<?> chiTietHoaDon(@PathVariable Integer maHoaDon) {
        return ResponseEntity.ok(hoaDonService.layChiTietHoaDon(maHoaDon));
    }

    @PatchMapping("/{maHoaDon}")
    public ResponseEntity<?> chinhSuaHoaDon(@PathVariable Integer maHoaDon, @RequestBody HoaDonRequest request) {
        return ResponseEntity.ok(hoaDonService.chinhSuaHoaDon(maHoaDon, request));
    }

    @PostMapping("/{maHoaDon}/thanh-toan")
    public ResponseEntity<?> thanhToanHoaDon(@PathVariable Integer maHoaDon) {
        return ResponseEntity.ok(hoaDonService.thanhToanHoaDon(maHoaDon));
    }

    @DeleteMapping("/{maHoaDon}")
    public ResponseEntity<?> xoaHoaDon(@PathVariable Integer maHoaDon) {
        hoaDonService.xoaHoaDon(maHoaDon);
        return ResponseEntity.noContent().build();
    }
}

