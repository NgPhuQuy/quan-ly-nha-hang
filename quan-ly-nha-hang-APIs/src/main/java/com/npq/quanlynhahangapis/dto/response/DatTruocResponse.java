package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DatTruocResponse(
        MatHangResponse matHang,
        Integer soLuong,
        BigDecimal donGia
) {
}
