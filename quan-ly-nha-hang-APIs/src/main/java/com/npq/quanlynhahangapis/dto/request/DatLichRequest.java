package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.Ban;
import com.npq.quanlynhahangapis.entity.KhachHang;

import java.time.LocalDateTime;

public record DatLichRequest(
        KhachHang khachHang,
        Ban ban,
        LocalDateTime thoiGian
) {
}
