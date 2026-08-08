package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuanLy {
    @Id
    @Column
    private int maQuanLy;

    @MapsId
    @OneToOne
    @JoinColumn(name = "ma_quan_ly")
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;
}
