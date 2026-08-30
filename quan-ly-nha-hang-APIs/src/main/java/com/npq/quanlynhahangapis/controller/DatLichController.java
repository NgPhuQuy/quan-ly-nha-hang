package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.CapNhatTrangThaiDatLichRequest;
import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.service.DatLichService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Getter
@Setter
@RestController
@RequestMapping
@RequiredArgsConstructor
public class DatLichController {

    private final DatLichService datLichService;

    @GetMapping("/dat-lich")
    ResponseEntity<?> danhSachDatLich() {
        return ResponseEntity.ok(datLichService.layDSDatLich());
    }

    @GetMapping("/dat-lich/{maDatLich}")
    ResponseEntity<?> chiTietDatLich(@PathVariable Integer maDatLich) {
        return ResponseEntity.ok(datLichService.layTheoId(maDatLich));
    }

    @GetMapping("/dat-lich/tra-cuu/{code}")
    ResponseEntity<?> traCuuDatLich(@PathVariable String code) {
        return ResponseEntity.ok(datLichService.traCuu(code));
    }

    @PatchMapping("/dat-lich/{maDatLich}/trang-thai")
    ResponseEntity<?> capNhatTrangThai(
            @PathVariable Integer maDatLich,
            @RequestBody CapNhatTrangThaiDatLichRequest request
    ) {
        return ResponseEntity.ok(datLichService.capNhatTrangThai(
                maDatLich,
                request.trangThai(),
                request.maBan()
        ));
    }

    @PostMapping("/dat-lich")
    ResponseEntity<?> datLich(@RequestBody DatLichRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(datLichService.datLich(request));
    }

    @PutMapping({"/dat-lich/{maDatLich}", "/bookings/{maDatLich}"})
    public ResponseEntity<?> capNhatDatLich(
            @PathVariable Integer maDatLich,
            @RequestBody DatLichRequest request
    ) {
        return ResponseEntity.ok(datLichService.capNhatDatLich(maDatLich, request));
    }

    @DeleteMapping({"/dat-lich/{maDatLich}", "/bookings/{maDatLich}"})
    public ResponseEntity<?> xoaDatLich(@PathVariable Integer maDatLich) {
        datLichService.xoaDatLich(maDatLich);
        return ResponseEntity.noContent().build();
    }

    @GetMapping({"/dat-lich/khung-gio", "/bookings/khung-gio"})
    public ResponseEntity<?> layKhungGio(
            @RequestParam Integer maChiNhanh,
            @RequestParam LocalDate ngay,
            @RequestParam Integer soKhach
    ) {
        return ResponseEntity.ok(datLichService.layKhungGio(maChiNhanh, ngay, soKhach));
    }
}
