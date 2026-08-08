package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maNguoiDung;

    @Column(length = 20, unique = true)
    private String taiKhoan;

    private String matKhau;

    private String avatar;

    @Column(length = 30)
    private String ho;

    @Column(length = 20)
    private String ten;

    @Column(length = 50, unique = true)
    private String email;

    @Column(length = 20, unique = true)
    private String soDienThoai;

    @CreationTimestamp
    private LocalDateTime ngayTao;

    @UpdateTimestamp
    private LocalDateTime ngayCapNhat;

    @Builder.Default
    private Boolean trangThai = true;
}