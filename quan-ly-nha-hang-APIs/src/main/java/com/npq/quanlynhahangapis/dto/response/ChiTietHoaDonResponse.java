package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

@Builder
public record ChiTietHoaDonResponse(
        Integer maChiTietHoaDon,
        MatHangResponse matHang,
        Integer soLuong
) {
}

