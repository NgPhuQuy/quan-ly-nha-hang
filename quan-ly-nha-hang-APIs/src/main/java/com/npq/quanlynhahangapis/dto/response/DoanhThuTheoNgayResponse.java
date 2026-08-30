package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DoanhThuTheoNgayResponse(
        String date,
        BigDecimal revenue,
        Integer invoices
) {
}

