package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class KhuVuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maKhuVuc;
    private String tenKhuVuc;

    @ManyToOne
    @JoinColumn(name = "ma_loai_khu_vuc")
    private LoaiKhuVuc loaiKhuVuc;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh")
    private ChiNhanh chiNhanh;

    @OneToMany(mappedBy = "khuVuc")
    private List<Ban> listBan;
}
