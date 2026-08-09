package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.service.NguoiDungService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping
public class NguoiDungController {

    private final NguoiDungService nguoiDungService;

    @PostMapping("/users")
    ResponseEntity<?> dangKy(@RequestBody @Valid NguoiDungRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.dangKy(dto));
    }


    @PostMapping("/auth/login")
    ResponseEntity<?> dangNhap(@RequestBody @Valid DangNhapRequest dto) {
        return ResponseEntity.ok(nguoiDungService.dangNhap(dto));
    }

    @GetMapping("users/{maNguoiDung}")
    ResponseEntity<?> layTheoId(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.layNguoiDungTheoId(maNguoiDung));
    }

}
