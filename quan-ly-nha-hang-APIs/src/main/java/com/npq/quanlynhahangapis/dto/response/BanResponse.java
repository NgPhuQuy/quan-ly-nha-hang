package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

@Builder
public record BanResponse(
        Integer maBan,
        Integer maChiNhanh,
        String tenChiNhanh,
        Boolean trangThai
) {
}
