package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

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
    @JoinColumn(name = "ma_ban", nullable = false)
    private Ban ban;
}
