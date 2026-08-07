package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DangNhapRequest(
        @NotBlank(message = "Tài khoản không được để trống!")
        String taiKhoan,
        @NotBlank(message = "Mật khẩu không được để trống!")
        @Size(min = 8, message = "Mật khẩu tối thiểu 8 ký tự!")
        String matKhau
) {
}
