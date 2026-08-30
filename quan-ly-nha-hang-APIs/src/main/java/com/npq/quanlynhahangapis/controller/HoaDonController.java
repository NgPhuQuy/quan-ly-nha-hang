package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.HoaDonRequest;
import com.npq.quanlynhahangapis.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class HoaDonController {
    private final HoaDonService hoaDonService;

    @GetMapping({"/invoices", "/hoa-don"})
    public ResponseEntity<?> danhSachHoaDon(
            @RequestParam(required = false) Integer branchId,
            @RequestParam(required = false) Integer maChiNhanh,
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String nguon,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String trangThai,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String keyword
    ) {
        Integer cId = branchId != null ? branchId : maChiNhanh;
        String sSource = source != null ? source : nguon;
        String sStatus = status != null ? status : trangThai;
        String sSearch = search != null ? search : keyword;

        return ResponseEntity.ok(hoaDonService.layDSHoaDon(cId, sSource, sStatus, sSearch));
    }

    @GetMapping({"/invoices/{idOrCode}", "/hoa-don/{idOrCode}"})
    public ResponseEntity<?> chiTietHoaDon(@PathVariable String idOrCode) {
        try {
            int id = Integer.parseInt(idOrCode);
            return ResponseEntity.ok(hoaDonService.layChiTietHoaDon(id));
        } catch (NumberFormatException e) {
            return ResponseEntity.ok(hoaDonService.layTheoCode(idOrCode));
        }
    }

    @PostMapping({"/invoices", "/hoa-don"})
    public ResponseEntity<?> taoHoaDon(@RequestBody HoaDonRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(hoaDonService.taoHoaDon(request));
    }

    @PostMapping({"/invoices/{maHoaDon}/payment", "/invoices/{maHoaDon}/thanh-toan", "/hoa-don/{maHoaDon}/thanh-toan"})
    public ResponseEntity<?> thanhToanHoaDon(@PathVariable Integer maHoaDon) {
        return ResponseEntity.ok(hoaDonService.thanhToanHoaDon(maHoaDon));
    }

    @PostMapping({"/invoices/{maHoaDon}/cancel", "/invoices/{maHoaDon}/huy", "/hoa-don/{maHoaDon}/huy"})
    public ResponseEntity<?> huyHoaDon(@PathVariable Integer maHoaDon) {
        return ResponseEntity.ok(hoaDonService.huyHoaDon(maHoaDon));
    }

    @DeleteMapping({"/invoices/{maHoaDon}", "/hoa-don/{maHoaDon}"})
    public ResponseEntity<?> xoaHoaDon(@PathVariable Integer maHoaDon) {
        hoaDonService.xoaHoaDon(maHoaDon);
        return ResponseEntity.noContent().build();
    }
}

