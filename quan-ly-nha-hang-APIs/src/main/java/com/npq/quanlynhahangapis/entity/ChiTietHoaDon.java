package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.PK.MaChiTietHoaDon;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietHoaDon {
    @EmbeddedId
    private MaChiTietHoaDon maChiTietHoaDon;

    @ManyToOne
    @MapsId("matHang")
    @JoinColumn(name = "ma_mat_hang")
    private MatHang matHang;

    @ManyToOne
    @MapsId("hoaDon")
    @JoinColumn(name = "ma_hoa_don")
    private HoaDon hoaDon;

    private Integer soLuong;

    @Column(precision = 12, scale = 2)
    private BigDecimal donGia;
}
