package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.service.NguoiDungService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/users")
//    @PreAuthorize("ADMIN")
    ResponseEntity<List<NguoiDungResponse>> layDSNguoiDung() {
        return ResponseEntity.ok(nguoiDungService.layDSNguoiDung());
    }

    @GetMapping("/users/{maNguoiDung}")
    ResponseEntity<?> chiTietNguoiDung(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.layNguoiDungTheoId(maNguoiDung));
    }
//    @PutMapping("/users/{maNguoiDung}")
//    ResponseEntity<?> capNhatThongTinNguoiDung(@PathVariable Integer maNguoiDung) {
//        return ResponseEntity.ok(nguoiDungService.layNguoiDungTheoId(maNguoiDung));
//    }
}
