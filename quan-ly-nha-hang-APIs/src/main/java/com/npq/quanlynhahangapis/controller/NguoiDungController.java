package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.service.NguoiDungService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController

public class NguoiDungController {

    private final NguoiDungService nguoiDungService;

    @PostMapping("/users")
    public ResponseEntity<?> dangKy(@RequestBody @Valid NguoiDungRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.dangKy(dto));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> dangNhap(@RequestBody @Valid DangNhapRequest dto) {
        return ResponseEntity.ok(nguoiDungService.dangNhap(dto));
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> layThongTinMe(@AuthenticationPrincipal Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.chiTietNguoiDung(maNguoiDung));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> dangXuat() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(Map.of("message", "Đăng xuất thành công!"));
    }

    @GetMapping("/users")
    public ResponseEntity<List<NguoiDungResponse>> layDSNguoiDung() {
        return ResponseEntity.ok(nguoiDungService.layDSNguoiDung());
    }

    @GetMapping("/users/{maNguoiDung}")
    public ResponseEntity<?> chiTietNguoiDung(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.chiTietNguoiDung(maNguoiDung));
    }

    @PatchMapping("/users/{maNguoiDung}/trang-thai")
    public ResponseEntity<?> doiTrangThaiNguoiDung(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.doiTrangThaiNguoiDung(maNguoiDung));
    }

    @PostMapping("/users/quan-ly")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> taoQuanLy(@RequestBody NguoiDungRequest quanly) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.taoQuanLy(quanly));
    }

    @PostMapping("/users/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> taoAdmin(@RequestBody NguoiDungRequest admin) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.taoAdmin(admin));
    }
}
