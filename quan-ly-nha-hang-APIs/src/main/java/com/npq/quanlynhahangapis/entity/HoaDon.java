package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maHoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien")
    private NguoiDung nhanVien;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang")
    private NguoiDung khachHang;

    @ManyToOne
    @JoinColumn(name = "ma_ban", nullable = true)
    private Ban ban;

    @Builder.Default
    private String nguon = "WALK_IN";//todo can nhac chinh ve enum hoac bo han

    @Builder.Default
    private String trangThai = "Chờ xử lý";

    @Column(precision = 14, scale = 2)
    @Builder.Default
    private BigDecimal tongTien = BigDecimal.ZERO;

    @CreationTimestamp
    private LocalDateTime ngayLapHoaDon;

    @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietHoaDon> listChiTietHoaDon;
}
