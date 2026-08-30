package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record KhachHangResponse(
        Integer maKhachHang,
        String hoTen,
        String soDienThoai,
        String email,
        Integer diemTichLuy,
        Integer soDon,
        BigDecimal tongChiTieu,
        String lanCuoiGhe
) {
}

