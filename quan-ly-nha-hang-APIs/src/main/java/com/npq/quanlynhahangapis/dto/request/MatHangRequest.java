package com.npq.quanlynhahangapis.dto.request;

import com.npq.quanlynhahangapis.entity.enums.LoaiMatHang;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

public record MatHangRequest(
        @NotBlank(message = "Tên mặt hàng không được để trống!")
        String tenMatHang,
        @NotNull(message = "Giá mặt hàng không được để trống!")
        @Positive(message = "Giá mặt hàng phải lớn hơn 0!")
        BigDecimal giaMatHang,
        @NotNull(message = "Loại mặt hàng không được để trống!")
        LoaiMatHang loaiMatHang,
        MultipartFile anhMinhHoa
) {
}
