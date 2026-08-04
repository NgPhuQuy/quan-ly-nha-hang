package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class LoaiKhuVuc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maLoaiKhuVuc;
    private String tenLoaiKhuVuc;

    @OneToMany(mappedBy = "loaiKhuVuc")
    private List<KhuVuc> listKhuVuc;
}
