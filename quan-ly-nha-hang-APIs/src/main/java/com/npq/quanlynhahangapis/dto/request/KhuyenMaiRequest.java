package com.npq.quanlynhahangapis.dto.request;

import java.time.LocalDate;

public record KhuyenMaiRequest(
        String tenKhuyenMai,
        String loaiKhuyenMai,
        String giaTri,
        LocalDate ngayBatDau,
        LocalDate ngayKetThuc,
        String trangThai
) {
}

