package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DatTruocResponse(
        Integer maDatLich,
        Integer maMatHang,
        String tenMatHang,
        Integer soLuong,
        BigDecimal donGia
) {
}
