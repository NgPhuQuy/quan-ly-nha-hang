package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record KhuyenMaiResponse(
        Integer maKhuyenMai,
        String tenKhuyenMai,
        String loaiKhuyenMai,
        String giaTri,
        LocalDate ngayBatDau,
        LocalDate ngayKetThuc,
        String trangThai,
        Integer soLuotDung
) {
}

