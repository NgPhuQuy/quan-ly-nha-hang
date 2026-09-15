package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record DatMonRequest(
        @NotNull(message = "Mã mặt hàng không được để trống!")
        Integer maMatHang,
        @NotNull(message = "Số lượng không được để trống!")
        @Min(value = 1, message = "Số lượng tối thiểu là 1!")
        Integer soLuong
) {
}
