package com.npq.quanlynhahangapis.controller;

import com.npq.quanlynhahangapis.entity.ChiTietHoaDon;
import com.npq.quanlynhahangapis.service.ChiTietHoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChiTietHoaDonController {
    private final ChiTietHoaDonService chiTietHoaDonService;

}
