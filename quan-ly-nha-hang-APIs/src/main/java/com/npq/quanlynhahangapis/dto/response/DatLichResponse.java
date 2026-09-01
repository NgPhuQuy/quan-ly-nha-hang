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
        Integer maKhachHang,
        LocalDate ngay,
        LocalTime gio,
        Integer soKhach,
        String ghiChu,
        TrangThaiDatLich trangThai,
        List<DatTruocResponse> listDatTruoc
) {
}

