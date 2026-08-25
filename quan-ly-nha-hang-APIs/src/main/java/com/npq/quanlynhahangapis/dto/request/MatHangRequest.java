package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.enums.LoaiMatHang;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record MatHangRequest(
        String tenMatHang,
        
        BigDecimal giaMatHang,
        LoaiMatHang loaiMatHang
) {
}
