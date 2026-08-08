package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record NguoiDungRequest(
        @NotBlank(message = "Tài khoản không được để trống!")
        String taiKhoan,
        @NotBlank(message = "Mật khẩu không được để trống!")
        @Size(min = 8, message = "Mật khẩu tối thiểu 8 ký tự!")
        String matKhau,
        String avatar,
        String ho,
        String ten,
        @Email(message = "Email không hợp lệ!")
        String email,
        @Pattern(regexp = "^0\\d{9}$", message = "Số điện thoại không hợp lệ!")
        @NotBlank(message = "Số điện thoại không được để trống!")
        String soDienThoai
) {
}
