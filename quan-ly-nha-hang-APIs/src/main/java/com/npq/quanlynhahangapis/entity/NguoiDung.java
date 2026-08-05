package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maNguoiDung;

    @Column(length = 20)
    private String taiKhoan;

    private String matKhau;

    private String avatar;

    @Column(length = 30)
    private String ho;

    @Column(length = 20)
    private String ten;

    @Column(length = 50)
    private String email;

    @Column(length = 20)
    private String soDienThoai;

    @CreationTimestamp
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    private LocalDateTime ngayCapNhat;

    private Boolean trangThai = Boolean.TRUE;
}