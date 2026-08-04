package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

@Entity
public class QuanLy {
    @Id
    @Column
    private int maQuanLy;

    @MapsId
    @OneToOne
    @JoinColumn(name = "ma_quan_ly")
    private NguoiDung nguoiDung;
}
