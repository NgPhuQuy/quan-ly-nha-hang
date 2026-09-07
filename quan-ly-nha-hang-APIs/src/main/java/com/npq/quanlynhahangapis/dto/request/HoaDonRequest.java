package com.npq.quanlynhahangapis.dto.request;

import java.util.List;

public record HoaDonRequest(
        Integer maBan,
        String soDienThoai,
        Integer maDatLich,
        List<ChiTietHoaDonRequest> listChiTiet
) {
}