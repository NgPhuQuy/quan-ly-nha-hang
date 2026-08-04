package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.Builder;

@Entity(name = "dat_lich")
@Builder
public class DatLich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maDatLich;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "ma_ban", nullable = false)
    private Ban ban;
}
