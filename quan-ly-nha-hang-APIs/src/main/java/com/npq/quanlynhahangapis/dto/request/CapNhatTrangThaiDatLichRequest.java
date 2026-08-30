package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;

public record CapNhatTrangThaiDatLichRequest(
        TrangThaiDatLich trangThai,
        Integer maBan
) {
}
