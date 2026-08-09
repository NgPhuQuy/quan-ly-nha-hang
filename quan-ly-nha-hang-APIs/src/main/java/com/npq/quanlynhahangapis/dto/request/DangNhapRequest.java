package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.NotBlank;

public record DangNhapRequest(
        @NotBlank(message = "Tài khoản không được để trống!")
        String taiKhoan,
        @NotBlank(message = "Mật khẩu không được để trống!")
        String matKhau
) {
}
