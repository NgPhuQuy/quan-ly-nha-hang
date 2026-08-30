package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DashboardOverviewResponse(
        BigDecimal tongDoanhThu,
        Long tongHoaDon,
        Long tongKhachHang,
        BigDecimal tongThu,
        BigDecimal tongChi,
        BigDecimal loiNhuan,
        Long chiNhanhHoatDong,
        Long tongChiNhanh
) {
}

