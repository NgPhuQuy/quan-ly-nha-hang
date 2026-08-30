package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KhuyenMai {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maKhuyenMai;

    private String tenKhuyenMai;
    private String loaiKhuyenMai; // "Giảm %", "Giảm tiền", "Mua X tặng Y"
    private String giaTri; // "10%", "20.000₫", "1 ly trà"

    private LocalDate ngayBatDau;
    private LocalDate ngayKetThuc;

    @Builder.Default
    private String trangThai = "Đang chạy"; // "Đang chạy", "Chờ chạy", "Đã kết thúc"

    @Builder.Default
    private Integer soLuotDung = 0;
}

