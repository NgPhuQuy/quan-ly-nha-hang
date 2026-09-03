package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.NotNull;

public record BanRequest(
        @NotNull(message = "Mã chi nhánh không được để trống!")
        Integer maChiNhanh
) {
}

