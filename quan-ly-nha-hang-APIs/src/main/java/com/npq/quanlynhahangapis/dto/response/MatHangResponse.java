package com.npq.quanlynhahangapis.dto.response;

import com.npq.quanlynhahangapis.entity.enums.LoaiMatHang;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record MatHangResponse(
        Integer maMatHang,
        String tenMatHang,
        String anhMinhHoa,
        BigDecimal giaMatHang,
        LoaiMatHang loaiMatHang,
        String trangThai,
        String danhMuc
) {
}
