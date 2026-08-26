package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.MatHangRequest;
import com.npq.quanlynhahangapis.service.MatHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class MatHangController {
    private final MatHangService matHangService;

    @PostMapping(path = "/mat-hang", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<?> taoMatHang(@ModelAttribute MatHangRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(matHangService.taoMatHang(request));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/mon-an")
    ResponseEntity<?> listMonAn(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDSMonAn(maChiNhanh));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/thuc-uong")
    ResponseEntity<?> listThucUong(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDSThucUong(maChiNhanh));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/dich-vu")
    ResponseEntity<?> listDichVu(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDSDichVu(maChiNhanh));
    }
}
