package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record NguoiDungRequest(
        @NotBlank(message = "Tài khoản không được để trống!")
        String taiKhoan,
        @NotBlank
        @Size(min = 8, message = "Mật khẩu tối thiểu 8 ký tự!")
        String matKhau,
        String avatar,
        String ho,
        String ten,
        String email,
        String soDienThoai
) {
}
