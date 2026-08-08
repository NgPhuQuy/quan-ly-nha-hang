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
public class KhachHang {
    @Id
    @Column
    private int maKhachHang;

    @MapsId
    @OneToOne
    @JoinColumn(name = "ma_khach_hang")
    private NguoiDung nguoiDung;

    @Column
    private int diemTichLuy;

    // them rank cho khach hang dua tren diem tich luy

    @OneToMany(mappedBy = "khachHang")
    private List<DatLich> listDatLich;
}
