package com.npq.quanlynhahangapis.dto.request;

public record NguoiDungRequest(
        String taiKhoan,
        String matKhau,
        String avatar,
        String ho,
        String ten,
        String email,
        String soDienThoai
) {
}
