package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ChiTietHoaDonRequest(
        @NotNull(message = "Mã mặt hàng không được để trống!")
        Integer maMatHang,
        @NotNull(message = "Số lượng không được để trống!")
        @Min(value = 1, message = "Số lượng tối thiểu là 1!")
        Integer soLuong,
        BigDecimal donGia
) {
}

