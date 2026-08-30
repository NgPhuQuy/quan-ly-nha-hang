package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import jakarta.validation.constraints.NotNull;

public record CapNhatTrangThaiDatLichRequest(
        @NotNull(message = "Trạng thái không được để trống!")
        TrangThaiDatLich trangThai,
        Integer maBan
) {
}
