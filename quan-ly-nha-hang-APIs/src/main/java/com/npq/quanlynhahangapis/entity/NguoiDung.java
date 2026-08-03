package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
public class NguoiDung {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maNguoiDung;

    @Column
    private String taiKhoan;

    @Column
    private String matKhau;

    @Column
    private String ho;

    @Column
    private String ten;

    @Column
    private String email;

    @Column
    private String soDienThoai;

    @Column
    @CreationTimestamp
    private LocalDateTime ngayTao;

}