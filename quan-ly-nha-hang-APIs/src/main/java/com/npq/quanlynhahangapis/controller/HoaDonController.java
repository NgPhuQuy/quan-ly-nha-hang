package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.HoaDonRequest;
import com.npq.quanlynhahangapis.service.HoaDonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoa-don")
@RequiredArgsConstructor
public class HoaDonController {
    private final HoaDonService hoaDonService;
//
//    @GetMapping
//    public ResponseEntity<?> danhSachHoaDon(
//            @RequestParam(required = false) Integer maChiNhanh,
//            @RequestParam(required = false) String nguon,
//            @RequestParam(required = false) String trangThai,
//            @RequestParam(required = false) String search
//    ) {
//        return ResponseEntity.ok(hoaDonService.layDSHoaDon(maChiNhanh, nguon, trangThai, search));
//    }

//    @GetMapping("/{idOrCode}")
//    public ResponseEntity<?> chiTietHoaDon(@PathVariable String idOrCode) {
//        try {
//            int id = Integer.parseInt(idOrCode);
//            return ResponseEntity.ok(hoaDonService.layChiTietHoaDon(id));
//        } catch (NumberFormatException e) {
//            return ResponseEntity.ok(hoaDonService.layTheoCode(idOrCode));
//        }
//    }

    @PostMapping
    public ResponseEntity<?> taoHoaDon(@RequestBody @Valid HoaDonRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hoaDonService.taoHoaDon(request));
    }

    @PostMapping("/{maHoaDon}/thanh-toan")
    public ResponseEntity<?> thanhToanHoaDon(@PathVariable Integer maHoaDon) {
        return ResponseEntity.ok(hoaDonService.thanhToanHoaDon(maHoaDon));
    }

    @PostMapping("/{maHoaDon}/huy")
    public ResponseEntity<?> huyHoaDon(@PathVariable Integer maHoaDon) {
        return ResponseEntity.ok(hoaDonService.huyHoaDon(maHoaDon));
    }

    @DeleteMapping("/{maHoaDon}")
    public ResponseEntity<?> xoaHoaDon(@PathVariable Integer maHoaDon) {
        hoaDonService.xoaHoaDon(maHoaDon);
        return ResponseEntity.noContent().build();
    }
}

