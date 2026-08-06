package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiNhanh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maChiNhanh;
    private String tenChiNhanh;

    @OneToMany(mappedBy = "chiNhanh")
    private List<QuanLy> quanLy;

    @OneToMany(mappedBy = "chiNhanh")
    private List<NhanVien> listNhanVien;

    @OneToMany(mappedBy = "chiNhanh")
    private List<KhuVuc> listKhuVuc;
}
