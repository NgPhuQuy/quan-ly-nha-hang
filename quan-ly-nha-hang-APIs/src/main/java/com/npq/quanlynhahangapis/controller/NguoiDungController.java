package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.DangNhapRequest;
import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.service.NguoiDungService;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping
public class NguoiDungController {

    private final NguoiDungService nguoiDungService;

    private final JwtUtil jwtUtil;

    public NguoiDungController(NguoiDungService nguoiDungService, JwtUtil jwtUtil) {
        this.nguoiDungService = nguoiDungService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/users")
    ResponseEntity<?> dangKy(@RequestBody NguoiDungRequest dto) {

        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.dangKy(dto));
    }

    @PostMapping("/auth/login")
    ResponseEntity<?> dangNhap(@RequestBody @Valid DangNhapRequest dto) {
        log.info(dto.taiKhoan());
        if (nguoiDungService.authenticate(dto.taiKhoan(), dto.matKhau())) {
            NguoiDung nguoiDung = nguoiDungService.layNguoiDungTheoTaiKhoan(dto.taiKhoan());
            String token = jwtUtil.taoToken(nguoiDung.getMaNguoiDung(),
                    nguoiDung.getTaiKhoan(),
                    nguoiDungService.layVaiTro(nguoiDung.getMaNguoiDung()));
            return ResponseEntity.ok().body(token);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("users/{maNguoiDung}")
    ResponseEntity<NguoiDungResponse> layTheoId(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.layNguoiDungTheoId(maNguoiDung));
    }


}
