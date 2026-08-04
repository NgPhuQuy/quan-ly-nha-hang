package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

@Entity
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
}
