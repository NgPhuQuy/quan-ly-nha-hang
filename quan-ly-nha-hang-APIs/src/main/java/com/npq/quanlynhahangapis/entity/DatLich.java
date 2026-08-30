package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
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

    @Column(unique = true, length = 30)
    private String maDatLichCode;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = true)
    private KhachHang khachHang;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;

    @ManyToOne
    @JoinColumn(name = "ma_ban", nullable = true)
    private Ban ban;

    private String hoTen;
    private String soDienThoai;
    private String email;
    private String dip;
    private String dichVuBoSung;

    private LocalDate ngay;
    private LocalTime gio;
    private Integer soKhach;
    private String ghiChu;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TrangThaiDatLich trangThai = TrangThaiDatLich.CHO_XAC_NHAN;

    @OneToMany(mappedBy = "datLich", fetch = FetchType.LAZY)
    private List<DatTruoc> listDatTruoc;

}
