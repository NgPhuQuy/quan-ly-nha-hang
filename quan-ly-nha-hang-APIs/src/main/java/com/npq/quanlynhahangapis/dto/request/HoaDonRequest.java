package com.npq.quanlynhahangapis.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record HoaDonRequest(
        @NotNull(message = "Mã chi nhánh không được để trống!")
        Integer maChiNhanh,
        Integer maBan,
        Integer maKhachHang,
        Integer maNhanVien,
        String tenKhachHang,
        String soDienThoai,
        String nguon, // "WALK_IN" or "ONLINE"
        String trangThai,
        @NotEmpty(message = "Danh sách món ăn không được để trống!")
        List<@Valid ChiTietHoaDonRequest> items
) {
}

