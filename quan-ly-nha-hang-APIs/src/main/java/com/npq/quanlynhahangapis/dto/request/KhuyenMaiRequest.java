package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record KhuyenMaiRequest(
        @NotBlank(message = "Tên khuyến mãi không được để trống!")
        String tenKhuyenMai,
        @NotBlank(message = "Loại khuyến mãi không được để trống!")
        String loaiKhuyenMai,
        @NotBlank(message = "Giá trị khuyến mãi không được để trống!")
        String giaTri,
        @NotNull(message = "Ngày bắt đầu không được để trống!")
        LocalDate ngayBatDau,
        @NotNull(message = "Ngày kết thúc không được để trống!")
        LocalDate ngayKetThuc,
        String trangThai
) {
}

