package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ThongKeTongQuanTrongNgayResponse(
        BigDecimal tong,
        Integer soHoaDonHoanThanh,
        Integer soHoaDonDaHuy,
        BigDecimal trungBinhHoaDon
) {
}
