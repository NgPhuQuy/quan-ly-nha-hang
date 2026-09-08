package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DoanhThuTheoChiNhanhResponse(//todo xoa hoac lam tiep
                                           String branch,
                                           BigDecimal revenue
) {
}

