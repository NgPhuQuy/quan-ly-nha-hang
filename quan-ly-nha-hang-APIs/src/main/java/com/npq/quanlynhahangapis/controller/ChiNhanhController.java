package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.ChiNhanhRequest;
import com.npq.quanlynhahangapis.service.ChiNhanhService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chi-nhanh")
@RequiredArgsConstructor
public class ChiNhanhController {

    private final ChiNhanhService chiNhanhService;

    @GetMapping
    public ResponseEntity<?> danhSachChiNhanh(@RequestParam(required = false, defaultValue = "false") boolean all) {
        if (all) {
            return ResponseEntity.ok(chiNhanhService.layTatCaChiNhanh());
        }
        return ResponseEntity.ok(chiNhanhService.layDSChiNhanh());
    }

    @GetMapping("/all")
    public ResponseEntity<?> danhSachTatCaChiNhanh() {
        return ResponseEntity.ok(chiNhanhService.layTatCaChiNhanh());
    }

    @GetMapping("/{maChiNhanh}")
    public ResponseEntity<?> chiTietChiNhanh(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.chiTietChiNhanh(maChiNhanh));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> taoChiNhanh(@ModelAttribute @Valid ChiNhanhRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chiNhanhService.taoChiNhanh(request));
    }

    @PutMapping(path = "/{maChiNhanh}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> capNhatChiNhanh(
            @PathVariable Integer maChiNhanh,
            @ModelAttribute @Valid ChiNhanhRequest request
    ) {
        return ResponseEntity.ok(chiNhanhService.capNhatChiNhanh(maChiNhanh, request));
    }

    @PatchMapping("/{maChiNhanh}/trang-thai")
    public ResponseEntity<?> doiTrangThai(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.doiTrangThaiChiNhanh(maChiNhanh));
    }

    @DeleteMapping("/{maChiNhanh}")
    public ResponseEntity<?> xoaChiNhanh(@PathVariable Integer maChiNhanh) {
        chiNhanhService.xoaChiNhanh(maChiNhanh);
        return ResponseEntity.noContent().build();
    }
}
