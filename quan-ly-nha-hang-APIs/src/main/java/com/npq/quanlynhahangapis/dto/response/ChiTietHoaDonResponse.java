package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

@Builder
public record ChiTietHoaDonResponse(
        MatHangResponse matHang,
        Integer soLuong
) {
}

