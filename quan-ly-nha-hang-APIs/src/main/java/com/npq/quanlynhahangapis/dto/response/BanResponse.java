package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

@Builder
public record BanResponse(
        Integer maBan,
        String soBan,
        Integer sucChua,
        Integer maChiNhanh,
        String tenChiNhanh,
        String trangThai,
        String currentInvoice //todo ???
) {
}
