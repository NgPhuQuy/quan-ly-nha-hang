package com.npq.quanlynhahangapis.dto.request;

public record ChiNhanhRequest(
        Integer maChiNhanh,
        String tenChiNhanh,
        Integer sucChua,
        Boolean trangThaiChiNhanh
) {
}
