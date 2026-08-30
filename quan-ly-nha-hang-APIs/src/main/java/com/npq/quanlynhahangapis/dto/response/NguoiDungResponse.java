package com.npq.quanlynhahangapis.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record NguoiDungResponse(
        Integer maNguoiDung,
        String taiKhoan,
        String avatar,
        String ho,
        String ten,
        String hoTen,
        String email,
        String soDienThoai,
        String vaiTro,
        String chiNhanh,
        LocalDateTime ngayTao,
        LocalDateTime ngayCapNhat,
        boolean trangThai
) {
}
