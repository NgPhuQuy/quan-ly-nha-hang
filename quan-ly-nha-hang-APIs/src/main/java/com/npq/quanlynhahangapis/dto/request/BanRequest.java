package com.npq.quanlynhahangapis.dto.request;

public record BanRequest(
        Integer maBan,
        String soBan,
        Integer sucChua,
        Integer maChiNhanh,
        String trangThai
) {
}

