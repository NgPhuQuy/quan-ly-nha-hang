package com.npq.quanlynhahangapis.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record ChiNhanhRequest(
        Integer maChiNhanh,
        String tenChiNhanh,
        Integer sucChua,
        Boolean trangThaiChiNhanh,
        String soDienThoai,
        String diaChi,
        MultipartFile anhChiNhanh
) {
}
