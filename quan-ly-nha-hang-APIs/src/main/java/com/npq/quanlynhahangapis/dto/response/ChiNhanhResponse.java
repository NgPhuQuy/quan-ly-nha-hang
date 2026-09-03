package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

@Builder
public record ChiNhanhResponse(
        Integer maChiNhanh,
        String tenChiNhanh,
        Boolean trangThaiChiNhanh,
        Integer soLuongDon,
        String soDienThoai,
        String diaChi,
        String anhChiNhanh
) {
}
