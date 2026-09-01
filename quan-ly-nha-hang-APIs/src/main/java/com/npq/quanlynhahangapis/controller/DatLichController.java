package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.CapNhatTrangThaiDatLichRequest;
import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.service.DatLichService;
import jakarta.validation.Valid;
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
@RequestMapping("/dat-lich")
@RequiredArgsConstructor
public class DatLichController {

    private final DatLichService datLichService;

    @GetMapping
    public ResponseEntity<?> danhSachDatLich() {
        return ResponseEntity.ok(datLichService.layDSDatLich());
    }

    @GetMapping("/{maDatLich}")
    public ResponseEntity<?> chiTietDatLich(@PathVariable Integer maDatLich) {
        return ResponseEntity.ok(datLichService.layTheoId(maDatLich));
    }

//    @GetMapping("/tra-cuu/{code}")
//    public ResponseEntity<?> traCuuDatLich(@PathVariable String code) {
//        return ResponseEntity.ok(datLichService.traCuu(code));
//    }

    @GetMapping("/khung-gio")
    public ResponseEntity<?> layKhungGio(
            @RequestParam Integer maChiNhanh,
            @RequestParam LocalDate ngay,
            @RequestParam Integer soKhach
    ) {
        return ResponseEntity.ok(datLichService.layKhungGio(maChiNhanh, ngay, soKhach));
    }

    @PostMapping
    public ResponseEntity<?> datLich(@RequestBody @Valid DatLichRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(datLichService.datLich(request));
    }

    @PatchMapping("/{maDatLich}/trang-thai")
    public ResponseEntity<?> capNhatTrangThai(
            @PathVariable Integer maDatLich,
            @RequestBody @Valid CapNhatTrangThaiDatLichRequest request
    ) {
        return ResponseEntity.ok(datLichService.capNhatTrangThai(
                maDatLich,
                request.trangThai(),
                request.maBan()
        ));
    }

    @PutMapping("/{maDatLich}")
    public ResponseEntity<?> capNhatDatLich(
            @PathVariable Integer maDatLich,
            @RequestBody @Valid DatLichRequest request
    ) {
        return ResponseEntity.ok(datLichService.capNhatDatLich(maDatLich, request));
    }

    @DeleteMapping("/{maDatLich}")
    public ResponseEntity<?> xoaDatLich(@PathVariable Integer maDatLich) {
        datLichService.xoaDatLich(maDatLich);
        return ResponseEntity.noContent().build();
    }
}
