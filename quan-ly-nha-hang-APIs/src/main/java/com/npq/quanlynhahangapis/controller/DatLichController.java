package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.DatChoRequest;
import com.npq.quanlynhahangapis.service.DatChoService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Getter
@Setter
@RestController
@RequestMapping
@RequiredArgsConstructor
public class DatLichController {

    private final DatLichService datLichService;

    @GetMapping("/dat-lich")
    ResponseEntity<?> danhSachDatCho() {
        return ResponseEntity.ok(datLichService.layDSDatLich());
    }

    @GetMapping("/dat-lich/{maDatLich}")
    ResponseEntity<?> danhSachDatLich(@RequestBody Integer maDatLich) {
        return ResponseEntity.ok(datLichService.layTheoId(maDatLich));
    }

    @PostMapping("/dat-lich")
    ResponseEntity<?> datLich(@RequestBody DatChoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(datLichService.datLich(request));
    }
}
