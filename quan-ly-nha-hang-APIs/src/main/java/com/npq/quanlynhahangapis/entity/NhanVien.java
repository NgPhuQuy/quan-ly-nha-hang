package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

@Entity
public class NhanVien {
    @Id
    @Column
    private int maNhanVien;

    @MapsId
    @OneToOne
    @JoinColumn(name = "ma_nhan_vien")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;
}