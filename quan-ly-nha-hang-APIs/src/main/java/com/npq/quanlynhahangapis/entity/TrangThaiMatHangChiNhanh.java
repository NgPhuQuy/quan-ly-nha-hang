package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.PK.MaTrangThaiMatHangChiNhanh;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiMatHang;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrangThaiMatHangChiNhanh {

    @EmbeddedId
    private MaTrangThaiMatHangChiNhanh maMonAnChiNhanh;

    @ManyToOne
    @MapsId("matHang")
    @JoinColumn(name = "ma_mat_hang")
    private MatHang matHang;

    @ManyToOne
    @MapsId("chiNhanh")
    @JoinColumn(name = "ma_chi_nhanh")
    private ChiNhanh chiNhanh;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TrangThaiMatHang trangThaiMatHang = TrangThaiMatHang.DANG_BAN;
}