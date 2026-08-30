package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DoanhThuTheoChiNhanhResponse(
        String branch,
        BigDecimal revenue
) {
}

