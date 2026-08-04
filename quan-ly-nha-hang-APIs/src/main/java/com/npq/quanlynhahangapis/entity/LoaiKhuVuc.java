package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LoaiKhuVuc {
    @Id
    private int maLoaiKhuVuc;
    private String tenLoaiKhuVuc;
}
