package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record HoaDonResponse(//todo chuyen các tham so ve ...Response
        Integer maHoaDon,
        Integer maChiNhanh,
        Integer maKhachHang,
        String nguon,
        String trangThai,
        BigDecimal tongTien,
        LocalDateTime ngayLapHoaDon,
        List<ChiTietHoaDonResponse> items
) {
}

