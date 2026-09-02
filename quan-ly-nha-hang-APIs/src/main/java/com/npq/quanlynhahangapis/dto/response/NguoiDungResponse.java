package com.npq.quanlynhahangapis.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.npq.quanlynhahangapis.entity.enums.VaiTro;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record NguoiDungResponse(
        Integer maNguoiDung,
        String taiKhoan,
        String ho,
        String ten,
        String email,
        String soDienThoai,
        VaiTro vaiTro,
        LocalDateTime ngayTao,
        LocalDateTime ngayCapNhat,
        boolean trangThai
) {
}
