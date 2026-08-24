package com.npq.quanlynhahangapis.dto.request;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record DatLichRequest(
        Integer maChiNhanh,
        LocalDate ngay,
        LocalTime gio,
        Integer soKhach,
        String ghiChu,

        List<DatTruocRequest> listDatTruoc
) {
}
