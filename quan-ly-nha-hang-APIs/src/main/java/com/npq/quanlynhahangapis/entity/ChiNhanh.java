package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class ChiNhanh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maChiNhanh;

    @OneToMany(mappedBy = "chiNhanh")
    private List<NhanVien> nhanViens;

}
