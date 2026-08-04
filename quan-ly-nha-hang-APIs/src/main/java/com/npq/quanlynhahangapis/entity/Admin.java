package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

@Entity
public class Admin {
    @Id
    @Column
    private int maAdmin;

    @OneToOne
    @MapsId
    @JoinColumn(name = "ma_admin")
    private NguoiDung nguoiDung;
}
