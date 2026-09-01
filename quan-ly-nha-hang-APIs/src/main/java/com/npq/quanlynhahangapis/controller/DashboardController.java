//package com.npq.quanlynhahangapis.controller;
//
//import com.npq.quanlynhahangapis.service.DashboardService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/dashboard")
//@RequiredArgsConstructor
//public class DashboardController {
//    private final DashboardService dashboardService;
//
//    @GetMapping("/overview")
//    public ResponseEntity<?> layTongQuan(@RequestParam(required = false) Integer maChiNhanh) {
//        return ResponseEntity.ok(dashboardService.layTongQuan(maChiNhanh));
//    }
//
//    @GetMapping("/revenue-by-day")
//    public ResponseEntity<?> layDoanhThuTheoNgay(@RequestParam(required = false) Integer maChiNhanh) {
//        return ResponseEntity.ok(dashboardService.layDoanhThuTheoNgay(maChiNhanh));
//    }
//
//    @GetMapping("/revenue-by-branch")
//    public ResponseEntity<?> layDoanhThuTheoChiNhanh() {
//        return ResponseEntity.ok(dashboardService.layDoanhThuTheoChiNhanh());
//    }
//
//    @GetMapping("/revenue-by-source")
//    public ResponseEntity<?> layDoanhThuTheoNguon(@RequestParam(required = false) Integer maChiNhanh) {
//        return ResponseEntity.ok(dashboardService.layDoanhThuTheoNguon(maChiNhanh));
//    }
//}
//
