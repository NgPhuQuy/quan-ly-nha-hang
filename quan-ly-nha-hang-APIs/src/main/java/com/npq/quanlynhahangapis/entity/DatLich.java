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

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private NguoiDung nguoiDung;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;

    private LocalDate ngay;
    private LocalTime gio;
    private Integer soKhach;
    private String ghiChu;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private TrangThaiDatLich trangThai = TrangThaiDatLich.THANH_CONG;

    @OneToMany(mappedBy = "datLich", fetch = FetchType.LAZY)
    private List<DatTruoc> listDatTruoc;

}
