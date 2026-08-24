package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
public class HoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maHoaDon;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien", nullable = false)
    private NhanVien nhanVien;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private KhachHang khachHang;

    @CreationTimestamp
    private LocalDateTime ngayLapHoaDon;
}
