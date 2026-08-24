package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.ChiNhanhRequest;
import com.npq.quanlynhahangapis.service.ChiNhanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChiNhanhController {

    private final ChiNhanhService chiNhanhService;

    @PostMapping("/chi-nhanh")
    ResponseEntity<?> taoChiNhanh(@RequestBody ChiNhanhRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chiNhanhService.taoChiNhanh(request));
    }

    @PutMapping("/chi-nhanh/{maChiNhanh}")
    ResponseEntity<?> capNhat(@RequestBody ChiNhanhRequest request) {
        return ResponseEntity.ok(chiNhanhService.capNhatChiNhanh(request));
    }

//    @PatchMapping("/chi-nhanh/{maChiNhanh}/trang-thai")
//    ResponseEntity<?> doiTrangThai(@PathVariable Integer maChiNhanh){

    /// /        return ResponseEntity.ok(chiNhanhService.doiTrangThaiChiNhanh(maChiNhanh));
//    }
    @GetMapping("/chi-nhanh")
    ResponseEntity<?> danhSachChiNhanh() {
        return ResponseEntity.ok(chiNhanhService.layDSChiNhanh());
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}")
    ResponseEntity<?> chiTietChiNhanh(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.layChiNhanhTheoID(maChiNhanh));
    }
}
