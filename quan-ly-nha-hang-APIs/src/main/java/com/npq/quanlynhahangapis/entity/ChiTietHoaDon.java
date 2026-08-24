package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Builder
@Getter
@Setter
public class ChiTietHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maChiTietHoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_mat_hang")
    private MatHang matHang;

    @ManyToOne
    @JoinColumn(name = "ma_hoa_don")
    private HoaDon hoaDon;

    private Integer soLuong;

    @Column(precision = 12, scale = 2)
    private BigDecimal donGia;
}
