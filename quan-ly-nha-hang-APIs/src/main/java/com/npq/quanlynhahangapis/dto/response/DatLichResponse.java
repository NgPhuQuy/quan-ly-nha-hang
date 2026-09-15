package com.npq.quanlynhahangapis.dto.response;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
public record DatLichResponse(
        Integer maDatLich,
        Integer maChiNhanh,
        LocalDate ngay,
        LocalTime gio,
        String ghiChu,
        TrangThaiDatLich trangThai,
        List<DatMonResponse> listDatMon
) {
}

