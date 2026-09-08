package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DoanhThuTheoNguonResponse( //todo nhu doanh thu theo chinhanh
                                         String name,
                                         BigDecimal value,
                                         String label
) {
}

