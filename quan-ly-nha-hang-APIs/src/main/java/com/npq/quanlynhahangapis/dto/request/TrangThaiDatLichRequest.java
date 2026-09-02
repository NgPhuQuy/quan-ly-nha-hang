package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import jakarta.validation.constraints.NotNull;

public record TrangThaiDatLichRequest(
        @NotNull(message = "Trạng thái không được để trống!")
        TrangThaiDatLich trangThai
) {
}
