package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.enums.LoaiMatHang;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maMatHang;

    private String tenMatHang;
    @Column(precision = 12, scale = 2)
    private BigDecimal giaMatHang;

    @Enumerated(EnumType.STRING)
    private LoaiMatHang loaiMatHang;
}