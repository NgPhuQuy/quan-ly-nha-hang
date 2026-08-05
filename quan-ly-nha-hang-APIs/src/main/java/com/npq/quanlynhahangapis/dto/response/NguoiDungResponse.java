package com.npq.quanlynhahangapis.dto.response;

import java.time.LocalDateTime;

public record NguoiDungResponse(
        Integer maNguoiDung,
        String taiKhoan,
        String avatar,
        String ho,
        String ten,
        String email,
        String soDienThoai,
        LocalDateTime ngayTao,
        LocalDateTime ngayCapNhat,
        Boolean trangThaiHoatDong
) {
}
