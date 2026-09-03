package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
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
    @Builder.Default
    private Integer soLuongDon = 50;
    @Builder.Default
    private LocalTime gioHoatDong = LocalTime.of(8, 0);
    @Builder.Default
    private LocalTime gioDongCua = LocalTime.of(21, 0);
    @Builder.Default
    private boolean trangThai = true;
    private String soDienThoai;
    private String diaChi;
    private String anhChiNhanh;

    @OneToMany(mappedBy = "chiNhanh")
    private List<Ban> listBan;
}
