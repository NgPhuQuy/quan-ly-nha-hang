package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.ThongKeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/thong-ke")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN') or hasRole('QUAN_LY')")
public class ThongKeController {
    private final ThongKeService thongKeService;

    @GetMapping("/theo-ngay")
    public ResponseEntity<?> layTongQuan(@RequestParam Integer maChiNhanh,
                                         @RequestParam(required = false) LocalDate ngay) {
        return ResponseEntity.ok(thongKeService.layTongQuanHomNay(maChiNhanh, ngay));
    }

    @GetMapping("/khoang")
    public ResponseEntity<?> layDoanhThuTheoKhoan(@RequestParam Integer maChiNhanh,
                                                 @RequestParam LocalDate tuNgay,
                                                 @RequestParam LocalDate denNgay) {
        return ResponseEntity.ok(thongKeService.layDoanhThuTheoNgay(maChiNhanh, tuNgay, denNgay));
    }

}

