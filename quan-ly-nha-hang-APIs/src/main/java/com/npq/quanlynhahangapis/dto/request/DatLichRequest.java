package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record DatLichRequest(
        @NotNull(message = "Mã chi nhánh không được để trống!")
        Integer maChiNhanh,
        @NotNull(message = "Ngày đặt không được để trống!")
        LocalDate ngay,
        @NotNull(message = "Giờ đến không được để trống!")
        LocalTime gio,
        @NotNull(message = "Số lượng khách không được để trống!")
        @Min(value = 1, message = "Số lượng khách tối thiểu là 1!")
        Integer soKhach,
        String ghiChu,
        String dip,
        List<@Valid DatTruocRequest> listDatTruoc
) {
}
