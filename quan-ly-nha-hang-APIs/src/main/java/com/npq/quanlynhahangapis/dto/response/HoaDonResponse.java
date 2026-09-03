package com.npq.quanlynhahangapis.dto.response;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiHoaDon;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record HoaDonResponse(
        Integer maHoaDon,
        Integer maChiNhanh,
        Integer maKhachHang,
        TrangThaiHoaDon trangThai,
        BigDecimal tongTien,
        LocalDateTime ngayLapHoaDon,
        List<ChiTietHoaDonResponse> listChiTietHoaDon
) {
}

