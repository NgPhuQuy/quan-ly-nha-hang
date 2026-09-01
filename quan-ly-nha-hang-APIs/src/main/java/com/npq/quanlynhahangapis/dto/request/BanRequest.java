package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record BanRequest(
        @NotNull(message = "Sức chứa không được để trống!")
        @Min(value = 1, message = "Sức chứa tối thiểu là 1 người!")
        Integer sucChua,
        @NotNull(message = "Mã chi nhánh không được để trống!")
        Integer maChiNhanh,
        String trangThai
) {
}

