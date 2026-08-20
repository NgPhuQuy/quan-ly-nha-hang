package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiMonAn;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mon_an_chi_nhanh")
@IdClass(MaMonAnChiNhanh.class)
public class MonAn_ChiNhanh {

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_mon_an")
    private MonAn monAn;

    @Id
    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh")
    private ChiNhanh chiNhanh;

    @Enumerated(EnumType.STRING)
    @Column(name = "trang_thai")
    private TrangThaiMonAn trangThaiMonAn;
}