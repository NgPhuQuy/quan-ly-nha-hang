package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maNguoiDung;

    @Column(length = 20)
    private String taiKhoan;

    @Column
    private String matKhau;

    @Column(length = 30)
    private String ho;

    @Column(length = 20)
    private String ten;

    @Column(length = 50)
    private String email;

    @Column(length = 20)
    private String soDienThoai;

    @Column
    @CreationTimestamp
    private LocalDateTime ngayTao;

    @Column
    @UpdateTimestamp
    private LocalDateTime ngayCapNhat;

}