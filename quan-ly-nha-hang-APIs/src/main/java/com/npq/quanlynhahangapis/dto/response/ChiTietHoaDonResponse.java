package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ChiTietHoaDonResponse(
        Integer maChiTietHoaDon,
        Integer maMatHang,
        String tenMatHang,
        String anhMinhHoa,
        Integer soLuong,
        BigDecimal donGia,
        BigDecimal thanhTien
) {
}

