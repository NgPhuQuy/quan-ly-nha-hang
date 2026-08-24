package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record DatChoResponse(
        Integer maDatLich,
        Integer maKhachHang,
        Integer maBan,
        LocalDateTime thoiGianDat
) {
}
