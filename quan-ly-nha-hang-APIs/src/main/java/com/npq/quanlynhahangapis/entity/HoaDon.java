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

    @Column(length = 30)
    private String maHoaDonCode;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien", nullable = true)
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = true)
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "ma_ban", nullable = true)
    private Ban ban;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = true)
    private ChiNhanh chiNhanh;

    private String tenKhachHang;
    private String soDienThoai;

    @Builder.Default
    private String nguon = "WALK_IN"; // "WALK_IN", "ONLINE"

    @Builder.Default
    private String trangThai = "Chờ xử lý"; // "Hoàn thành", "Chờ xử lý", "Đã hủy"

    @Column(precision = 14, scale = 2)
    @Builder.Default
    private BigDecimal tongTien = BigDecimal.ZERO;

    @CreationTimestamp
    private LocalDateTime ngayLapHoaDon;

    @OneToMany(mappedBy = "hoaDon", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ChiTietHoaDon> listChiTietHoaDon = new ArrayList<>();
}
