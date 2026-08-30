package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record GiaoDichThuChiResponse(
        Integer maGiaoDich,
        String maGiaoDichCode,
        String loai,
        String danhMuc,
        String moTa,
        BigDecimal soTien,
        LocalDate ngayGiaoDich,
        String ghiChu,
        Integer maChiNhanh,
        String tenChiNhanh
) {
}

