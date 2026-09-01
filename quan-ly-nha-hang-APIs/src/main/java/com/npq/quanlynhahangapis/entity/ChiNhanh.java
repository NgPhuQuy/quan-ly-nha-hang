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
    private Integer maChiNhanh;
    private String tenChiNhanh;
    private Integer sucChua;
    @Builder.Default
    private boolean trangThai = true;
    private String soDienThoai;
    private String diaChi;
    private String anhChiNhanh;

    @OneToMany(mappedBy = "chiNhanh")
    private List<GioHoatDong> listGioHoatDong;

    @OneToMany(mappedBy = "chiNhanh")
    private List<Ban> listBan;
}
