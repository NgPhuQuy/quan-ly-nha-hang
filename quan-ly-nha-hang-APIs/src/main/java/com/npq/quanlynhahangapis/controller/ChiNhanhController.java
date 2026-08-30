package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.ChiNhanhRequest;
import com.npq.quanlynhahangapis.service.ChiNhanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChiNhanhController {

    private final ChiNhanhService chiNhanhService;

    @GetMapping({"/chi-nhanh", "/branches"})
    public ResponseEntity<?> danhSachChiNhanh(@RequestParam(required = false, defaultValue = "false") boolean all) {
        if (all) {
            return ResponseEntity.ok(chiNhanhService.layTatCaChiNhanh());
        }
        return ResponseEntity.ok(chiNhanhService.layDSChiNhanh());
    }

    @GetMapping({"/chi-nhanh/all", "/branches/all"})
    public ResponseEntity<?> danhSachTatCaChiNhanh() {
        return ResponseEntity.ok(chiNhanhService.layTatCaChiNhanh());
    }

    @GetMapping({"/chi-nhanh/{maChiNhanh}", "/branches/{maChiNhanh}"})
    public ResponseEntity<?> chiTietChiNhanh(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.chiTietChiNhanh(maChiNhanh));
    }

    @PostMapping(path = {"/chi-nhanh", "/branches"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> taoChiNhanh(@ModelAttribute ChiNhanhRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chiNhanhService.taoChiNhanh(request));
    }

    @PutMapping(path = {"/chi-nhanh/{maChiNhanh}", "/branches/{maChiNhanh}"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> capNhatChiNhanh(
            @PathVariable Integer maChiNhanh,
            @ModelAttribute ChiNhanhRequest request
    ) {
        return ResponseEntity.ok(chiNhanhService.capNhatChiNhanh(maChiNhanh, request));
    }

    @PatchMapping({"/chi-nhanh/{maChiNhanh}/trang-thai", "/branches/{maChiNhanh}/status"})
    public ResponseEntity<?> doiTrangThai(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.doiTrangThaiChiNhanh(maChiNhanh));
    }

    @DeleteMapping({"/chi-nhanh/{maChiNhanh}", "/branches/{maChiNhanh}"})
    public ResponseEntity<?> xoaChiNhanh(@PathVariable Integer maChiNhanh) {
        chiNhanhService.xoaChiNhanh(maChiNhanh);
        return ResponseEntity.noContent().build();
    }
}
