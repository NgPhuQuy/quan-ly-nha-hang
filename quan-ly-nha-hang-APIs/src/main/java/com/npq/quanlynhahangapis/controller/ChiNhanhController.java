package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.ChiNhanhRequest;
import com.npq.quanlynhahangapis.service.ChiNhanhService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ChiNhanhController {

    private final ChiNhanhService chiNhanhService;

    @PostMapping(path = "/chi-nhanh", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<?> taoChiNhanh(@ModelAttribute ChiNhanhRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chiNhanhService.taoChiNhanh(request));
    }

    //todo hoan chinh cai phan nay sau
    //chinh sua chi nhanh PUT
//    @PutMapping("/chi-nhanh/{maChiNhanh}")
//    ResponseEntity<?> capNhat(@PathVariable Integer maChiNhanh, @RequestBody ChiNhanhRequest request) {
//        request = new ChiNhanhRequest(maChiNhanh, request.tenChiNhanh(), request.trangThaiChiNhanh());
//        return ResponseEntity.ok(chiNhanhService.capNhatChiNhanh(request));
//    }

    @GetMapping("/chi-nhanh/{maChiNhanh}")
    ResponseEntity<?> chiTietChiNhanh(@PathVariable Integer maChiNhanh) {
        return ResponseEntity.ok(chiNhanhService.chiTietChiNhanh(maChiNhanh));
    }

//    @PatchMapping("/chi-nhanh/{maChiNhanh}/trang-thai")
//    ResponseEntity<?> doiTrangThai(@PathVariable Integer maChiNhanh){

    /// /        return ResponseEntity.ok(chiNhanhService.doiTrangThaiChiNhanh(maChiNhanh));
//    }
    @GetMapping("/chi-nhanh")
    ResponseEntity<?> danhSachChiNhanh() {
        return ResponseEntity.ok(chiNhanhService.layDSChiNhanh());
    }
}
