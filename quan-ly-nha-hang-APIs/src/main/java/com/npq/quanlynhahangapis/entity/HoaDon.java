package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.enums.Nguon;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiHoaDon;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private NguoiDung nguoiLapHoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang")
    private NguoiDung khachHang;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Nguon nguon = Nguon.VANG_LAI;
    @ManyToOne
    @JoinColumn(name = "ma_ban")
    private Ban ban;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private TrangThaiHoaDon trangThai = TrangThaiHoaDon.DANG_PHUC_VU;

    @Column(precision = 14, scale = 2)
    @Builder.Default
    private BigDecimal tongTien = BigDecimal.ZERO;

    @CreationTimestamp
    private LocalDateTime ngayLapHoaDon;

    @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ChiTietHoaDon> listChiTietHoaDon;
}
