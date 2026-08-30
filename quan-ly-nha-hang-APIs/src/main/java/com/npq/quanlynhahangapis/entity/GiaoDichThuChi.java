package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GiaoDichThuChi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maGiaoDich;

    @Column(length = 30)
    private String maGiaoDichCode;

    @Column(length = 10)
    private String loai; // "Thu" hoặc "Chi"

    private String danhMuc; // "Doanh thu bán hàng", "Nguyên vật liệu", "Nhân sự", "Điện nước",...
    private String moTa;

    @Column(precision = 14, scale = 2)
    private BigDecimal soTien;

    private LocalDate ngayGiaoDich;

    private String ghiChu;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = true)
    private ChiNhanh chiNhanh;

    private String tenChiNhanh;
}

