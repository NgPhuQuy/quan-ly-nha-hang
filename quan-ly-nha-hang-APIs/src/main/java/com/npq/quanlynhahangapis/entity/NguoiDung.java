package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.enums.VaiTro;
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
    private Integer maNguoiDung;

    @Column(length = 20, unique = true)
    private String taiKhoan;

    private String matKhau;

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

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VaiTro vaiTro = VaiTro.KHACH_HANG;
}