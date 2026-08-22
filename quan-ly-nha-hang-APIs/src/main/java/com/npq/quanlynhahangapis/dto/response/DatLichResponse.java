package com.npq.quanlynhahangapis.dto.response;

import com.npq.quanlynhahangapis.entity.Ban;
import com.npq.quanlynhahangapis.entity.KhachHang;
import lombok.Builder;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Builder
public record DatLichResponse(
        Integer maDatLich,
        KhachHang khachHang,
        Ban ban,
        LocalDateTime thoiGianDat
) {
}
