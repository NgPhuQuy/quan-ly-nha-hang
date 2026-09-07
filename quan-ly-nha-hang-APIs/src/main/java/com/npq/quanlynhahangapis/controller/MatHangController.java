package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.MatHangRequest;
import com.npq.quanlynhahangapis.service.MatHangService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class MatHangController {
    private final MatHangService matHangService;

    @GetMapping("/mat-hang")
    public ResponseEntity<?> danhSachTatCaMatHang() {
        return ResponseEntity.ok(matHangService.layTatCaMatHang());
    }

    @GetMapping("/mat-hang/{maMatHang}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
    public ResponseEntity<?> chiTietMatHang(@PathVariable Integer maMatHang) {
        return ResponseEntity.ok(matHangService.chiTietMatHang(maMatHang));
    }

    @PostMapping(path = "/mat-hang", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> taoMatHang(@ModelAttribute @Valid MatHangRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(matHangService.taoMatHang(request));
    }

    @PutMapping(path = "/mat-hang/{maMatHang}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
    public ResponseEntity<?> capNhatMatHang(@PathVariable Integer maMatHang,
                                            @ModelAttribute @Valid MatHangRequest request) {
        return ResponseEntity.ok(matHangService.capNhatMatHang(maMatHang, request));
    }

    @GetMapping("/chi-nhanh/{maChiNhanh}/mat-hang")
    public ResponseEntity<?> danhSachMatHangPublic(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(matHangService.layDanhSachMatHangOK(maChiNhanh));
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
