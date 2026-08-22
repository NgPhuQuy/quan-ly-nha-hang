package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.MatHang;

import java.math.BigDecimal;

public record DatTruocRequest(
        DatLich datLich,
        MatHang matHang,
        Integer soLuong,
        BigDecimal donGia
) {
}
