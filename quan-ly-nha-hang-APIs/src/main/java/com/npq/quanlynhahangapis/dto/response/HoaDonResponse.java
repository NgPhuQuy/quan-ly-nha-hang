package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record HoaDonResponse(
        Integer maHoaDon,
        String maHoaDonCode,
        Integer maChiNhanh,
        String tenChiNhanh,
        Integer maBan,
        String soBan,
        Integer maKhachHang,
        String tenKhachHang,
        String soDienThoai,
        Integer maNhanVien,
        String tenNhanVien,
        String nguon,
        String trangThai,
        BigDecimal tongTien,
        LocalDateTime ngayLapHoaDon,
        String thoiGianDinhDang,
        List<ChiTietHoaDonResponse> items
) {
}

