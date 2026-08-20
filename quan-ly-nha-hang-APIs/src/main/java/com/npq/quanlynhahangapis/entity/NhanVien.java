package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhanVien {
    @Id
    @Column
    private Integer maNhanVien;

    @MapsId
    @OneToOne
    @JoinColumn(name = "ma_nhan_vien")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;
}
