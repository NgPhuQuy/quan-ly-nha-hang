package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.GiaoDichThuChiRequest;
import com.npq.quanlynhahangapis.service.GiaoDichThuChiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class GiaoDichThuChiController {
    private final GiaoDichThuChiService giaoDichThuChiService;

    @GetMapping({"/transactions", "/thu-chi"})
    public ResponseEntity<?> danhSachGiaoDich(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String loai,
            @RequestParam(required = false) Integer branchId,
            @RequestParam(required = false) Integer maChiNhanh
    ) {
        String t = type != null ? type : loai;
        Integer cId = branchId != null ? branchId : maChiNhanh;
        return ResponseEntity.ok(giaoDichThuChiService.layDSGiaoDich(t, cId));
    }

    @PostMapping({"/transactions", "/thu-chi"})
    public ResponseEntity<?> taoGiaoDich(@RequestBody GiaoDichThuChiRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(giaoDichThuChiService.taoGiaoDich(request));
    }

    @DeleteMapping({"/transactions/{maGiaoDich}", "/thu-chi/{maGiaoDich}"})
    public ResponseEntity<?> xoaGiaoDich(@PathVariable Integer maGiaoDich) {
        giaoDichThuChiService.xoaGiaoDich(maGiaoDich);
        return ResponseEntity.noContent().build();
    }
}

