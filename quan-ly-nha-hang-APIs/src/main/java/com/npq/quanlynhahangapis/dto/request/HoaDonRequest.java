package com.npq.quanlynhahangapis.dto.request;

import java.util.List;

public record HoaDonRequest(
        Integer maChiNhanh,
        Integer maBan,
        Integer maKhachHang,
        Integer maNhanVien,
        String tenKhachHang,
        String soDienThoai,
        String nguon, // "WALK_IN" or "ONLINE"
        String trangThai,
        List<ChiTietHoaDonRequest> items
) {
}

