package com.npq.quanlynhahangapis.dto.request;

public record NguoiDungCapNhatRequest(
        String ho,
        String ten,
        String email,
        String soDienThoai,
        String vaiTro,
        Integer maChiNhanh,
        Boolean trangThai
) {
}

