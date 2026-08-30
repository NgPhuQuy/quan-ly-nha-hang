package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.web.multipart.MultipartFile;

public record ChiNhanhRequest(
        Integer maChiNhanh,
        @NotBlank(message = "Tên chi nhánh không được để trống!")
        String tenChiNhanh,
        @NotNull(message = "Sức chứa không được để trống!")
        @Min(value = 1, message = "Sức chứa phải lớn hơn 0!")
        Integer sucChua,
        Boolean trangThaiChiNhanh,
        @NotBlank(message = "Số điện thoại không được để trống!")
        @Pattern(regexp = "^0\\d{9}$", message = "Số điện thoại không hợp lệ!")
        String soDienThoai,
        @NotBlank(message = "Địa chỉ không được để trống!")
        String diaChi,
        MultipartFile anhChiNhanh
) {
}
