package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BanRequest(
        Integer maBan,
        @NotBlank(message = "Số bàn không được để trống!")
        String soBan,
        @NotNull(message = "Sức chứa không được để trống!")
        @Min(value = 1, message = "Sức chứa tối thiểu là 1 người!")
        Integer sucChua,
        Integer maChiNhanh,
        String trangThai
) {
}

