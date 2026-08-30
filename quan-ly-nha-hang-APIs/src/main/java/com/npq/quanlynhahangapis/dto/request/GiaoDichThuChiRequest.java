package com.npq.quanlynhahangapis.dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GiaoDichThuChiRequest(
        String loai, // "Thu" hoặc "Chi"
        String danhMuc,
        String moTa,
        BigDecimal soTien,
        LocalDate ngayGiaoDich,
        String ghiChu,
        Integer maChiNhanh
) {
}

