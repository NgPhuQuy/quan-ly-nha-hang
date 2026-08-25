package com.npq.quanlynhahangapis.dto.response;

import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
public record DatLichResponse(
        Integer maChiNhanh,
        LocalDate ngay,
        LocalTime gio,
        Integer soKhach,
        String ghiChu,
        List<DatTruocResponse> listDatTruoc
) {
}

