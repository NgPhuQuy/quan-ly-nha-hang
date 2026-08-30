package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/dashboard/overview")
    public ResponseEntity<?> layTongQuan(
            @RequestParam(required = false) Integer branchId,
            @RequestParam(required = false) Integer maChiNhanh
    ) {
        Integer cId = branchId != null ? branchId : maChiNhanh;
        return ResponseEntity.ok(dashboardService.layTongQuan(cId));
    }

    @GetMapping("/dashboard/revenue-by-day")
    public ResponseEntity<?> layDoanhThuTheoNgay(
            @RequestParam(required = false) Integer branchId,
            @RequestParam(required = false) Integer maChiNhanh
    ) {
        Integer cId = branchId != null ? branchId : maChiNhanh;
        return ResponseEntity.ok(dashboardService.layDoanhThuTheoNgay(cId));
    }

    @GetMapping("/dashboard/revenue-by-branch")
    public ResponseEntity<?> layDoanhThuTheoChiNhanh() {
        return ResponseEntity.ok(dashboardService.layDoanhThuTheoChiNhanh());
    }

    @GetMapping("/dashboard/revenue-by-source")
    public ResponseEntity<?> layDoanhThuTheoNguon(
            @RequestParam(required = false) Integer branchId,
            @RequestParam(required = false) Integer maChiNhanh
    ) {
        Integer cId = branchId != null ? branchId : maChiNhanh;
        return ResponseEntity.ok(dashboardService.layDoanhThuTheoNguon(cId));
    }
}

