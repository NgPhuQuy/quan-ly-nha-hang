package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DatLich {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maDatLich;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;

    private LocalDate ngay;
    private LocalTime gio;
    private Integer soKhach;
    private String ghiChu;

    @OneToMany(mappedBy = "datLich", fetch = FetchType.LAZY)
    private List<DatTruoc> listDatTruoc;

}
