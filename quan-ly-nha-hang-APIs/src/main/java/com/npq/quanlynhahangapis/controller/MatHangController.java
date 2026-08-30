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

    @GetMapping({"/foods", "/mat-hang"})
    public ResponseEntity<?> danhSachTatCaMatHang() {
        return ResponseEntity.ok(matHangService.layTatCaMatHang());
    }

    @GetMapping({"/foods/{maMatHang}", "/mat-hang/{maMatHang}"})
    public ResponseEntity<?> chiTietMatHang(@PathVariable Integer maMatHang) {
        return ResponseEntity.ok(matHangService.layMatHangTheoId(maMatHang));
    }

    @PostMapping(path = {"/mat-hang", "/foods"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> taoMatHang(@ModelAttribute MatHangRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(matHangService.taoMatHang(request));
    }

    @PutMapping(path = {"/mat-hang/{maMatHang}", "/foods/{maMatHang}"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> capNhatMatHang(
            @PathVariable Integer maMatHang,
            @ModelAttribute MatHangRequest request
    ) {
        return ResponseEntity.ok(matHangService.capNhatMatHang(maMatHang, request));
    }

    @DeleteMapping({"/mat-hang/{maMatHang}", "/foods/{maMatHang}"})
    public ResponseEntity<?> xoaMatHang(@PathVariable Integer maMatHang) {
        matHangService.xoaMatHang(maMatHang);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/mon-an")
    public ResponseEntity<?> listMonAn(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDSMonAn(maChiNhanh));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/thuc-uong")
    public ResponseEntity<?> listThucUong(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDSThucUong(maChiNhanh));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/dich-vu")
    public ResponseEntity<?> listDichVu(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDSDichVu(maChiNhanh));
    }
}
