package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.dto.request.NguoiDungRequest;
import com.npq.quanlynhahangapis.dto.response.NguoiDungResponse;
import com.npq.quanlynhahangapis.service.NguoiDungService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nguoi-dungs")
public class NguoiDungController {

    private final NguoiDungService nguoiDungService;

    public NguoiDungController(NguoiDungService nguoiDungService) {
        this.nguoiDungService = nguoiDungService;
    }

    @GetMapping("/")
    public ResponseEntity<List<NguoiDungResponse>> layTatCaNguoiDung() {
        return ResponseEntity.ok(nguoiDungService.layDanhSachNguoiDung());
    }

    @GetMapping("/{maNguoiDung}")
    ResponseEntity<NguoiDungResponse> layTheoId(@PathVariable Integer maNguoiDung) {
        return ResponseEntity.ok(nguoiDungService.layNguoiDungTheoId(maNguoiDung));
    }

    @PostMapping
    ResponseEntity<NguoiDungResponse> dangKyNguoiDung(@RequestBody NguoiDungRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(nguoiDungService.taoNguoiDung(dto));
    }
}
