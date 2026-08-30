package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record GiaoDichThuChiRequest(
        @NotBlank(message = "Loại giao dịch không được để trống!")
        String loai, // "Thu" hoặc "Chi"
        @NotBlank(message = "Danh mục không được để trống!")
        String danhMuc,
        String moTa,
        @NotNull(message = "Số tiền không được để trống!")
        @Positive(message = "Số tiền phải lớn hơn 0!")
        BigDecimal soTien,
        LocalDate ngayGiaoDich,
        String ghiChu,
        @NotNull(message = "Mã chi nhánh không được để trống!")
        Integer maChiNhanh
) {
}

