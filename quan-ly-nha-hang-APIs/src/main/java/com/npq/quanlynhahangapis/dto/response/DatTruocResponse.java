package com.npq.quanlynhahangapis.dto.response;

import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.MatHang;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record DatTruocResponse(
        DatLich datLich,
        MatHang matHang,
        Integer soLuong,
        BigDecimal donGia
) {
}
