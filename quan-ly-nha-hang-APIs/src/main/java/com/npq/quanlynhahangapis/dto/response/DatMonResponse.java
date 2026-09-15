package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DatMonResponse(
        MatHangResponse matHang,
        Integer soLuong,
        BigDecimal donGia
) {
}
