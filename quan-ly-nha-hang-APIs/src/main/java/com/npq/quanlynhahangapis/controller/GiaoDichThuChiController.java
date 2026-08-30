package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.GiaoDichThuChiRequest;
import com.npq.quanlynhahangapis.service.GiaoDichThuChiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/thu-chi")
@RequiredArgsConstructor
public class GiaoDichThuChiController {
    private final GiaoDichThuChiService giaoDichThuChiService;

    @GetMapping
    public ResponseEntity<?> danhSachGiaoDich(
            @RequestParam(required = false) String loai,
            @RequestParam(required = false) Integer maChiNhanh
    ) {
        return ResponseEntity.ok(giaoDichThuChiService.layDSGiaoDich(loai, maChiNhanh));
    }

    @PostMapping
    public ResponseEntity<?> taoGiaoDich(@RequestBody @Valid GiaoDichThuChiRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(giaoDichThuChiService.taoGiaoDich(request));
    }

    @DeleteMapping("/{maGiaoDich}")
    public ResponseEntity<?> xoaGiaoDich(@PathVariable Integer maGiaoDich) {
        giaoDichThuChiService.xoaGiaoDich(maGiaoDich);
        return ResponseEntity.noContent().build();
    }
}

