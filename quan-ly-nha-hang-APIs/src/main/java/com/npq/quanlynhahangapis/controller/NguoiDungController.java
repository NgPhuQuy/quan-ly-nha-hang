package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.service.NguoiDungService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class NguoiDungController {

    private final NguoiDungService nguoiDungService;

    public NguoiDungController(NguoiDungService nguoiDungService) {
        this.nguoiDungService = nguoiDungService;
    }

    @PostMapping("/users")
    public ResponseEntity<NguoiDungResponse> dangKy(@RequestBody NguoiDungRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.dangKy(dto));
    }

    @PostMapping("/auth/login")
    ResponseEntity<?> dangNhap(@RequestBody @Valid NguoiDungRequest dto) {
        if (nguoiDungService.authenticate(dto.taiKhoan(), dto.matKhau())) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/{maNguoiDung}")
    ResponseEntity<NguoiDungResponse> layTheoId(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.layNguoiDungTheoId(maNguoiDung));
    }


}
