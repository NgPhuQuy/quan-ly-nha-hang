package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record DoanhThuTheoNgayResponse(
        LocalDate ngay,
        BigDecimal doanhThu
) {
}

