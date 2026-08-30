package com.npq.quanlynhahangapis.dto.response;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
public record DatLichResponse(
        Integer maDatLich,
        String maDatLichCode,
        Integer maChiNhanh,
        String tenChiNhanh,
        String hoTen,
        String soDienThoai,
        String email,
        String dip,
        List<String> dichVuBoSung,
        LocalDate ngay,
        LocalTime gio,
        Integer soKhach,
        String ghiChu,
        TrangThaiDatLich trangThai,
        Integer maBan,
        String soBan,
        List<DatTruocResponse> listDatTruoc
) {
}

