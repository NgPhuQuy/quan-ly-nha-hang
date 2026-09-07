package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.ChiNhanhRequest;
import com.npq.quanlynhahangapis.service.ChiNhanhService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chi-nhanh")
@RequiredArgsConstructor
public class ChiNhanhController {
    private final ChiNhanhService chiNhanhService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> danhSachChiNhanh() {
        return ResponseEntity.ok(chiNhanhService.layTatCaChiNhanh());
    }

    @GetMapping("/public")
    public ResponseEntity<?> danhSachChiNhanhPublic() {
        return ResponseEntity.ok(chiNhanhService.layDanhSachChiNhanhHoatDong());
    }

    @GetMapping("/{maChiNhanh}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
    public ResponseEntity<?> chiTietChiNhanh(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.chiTietChiNhanh(maChiNhanh));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> taoChiNhanh(@ModelAttribute @Valid ChiNhanhRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chiNhanhService.taoChiNhanh(request));
    }

    @PutMapping(name = "/{maChiNhanh}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
    public ResponseEntity<?> capNhatChiNhanh(@PathVariable Integer maChiNhanh,
                                             @ModelAttribute @Valid ChiNhanhRequest request) {
        return ResponseEntity.ok(chiNhanhService.capNhatChiNhanh(maChiNhanh, request));
    }

    @PatchMapping("/{maChiNhanh}/trang-thai")
    @PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
    public ResponseEntity<?> doiTrangThai(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.doiTrangThaiChiNhanh(maChiNhanh));
    }

}
