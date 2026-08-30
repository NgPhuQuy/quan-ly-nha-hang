package com.npq.quanlynhahangapis.dto.request;

import java.math.BigDecimal;

public record ChiTietHoaDonRequest(
        Integer maMatHang,
        Integer soLuong,
        BigDecimal donGia
) {
}

