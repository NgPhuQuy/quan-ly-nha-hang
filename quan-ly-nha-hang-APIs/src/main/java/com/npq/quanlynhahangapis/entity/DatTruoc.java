package com.npq.quanlynhahangapis.entity;

import com.npq.quanlynhahangapis.entity.PK.MaDatTruoc;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DatTruoc {

    @EmbeddedId
    private MaDatTruoc maDatTruoc;

    @ManyToOne
    @MapsId("datLich")
    @JoinColumn(name = "ma_dat_lich", nullable = false)
    private DatLich datLich;

    @ManyToOne
    @MapsId("matHang")
    @JoinColumn(name = "ma_mat_hang", nullable = false)
    private MatHang matHang;

    private Integer soLuong;

    @Column(precision = 12, scale = 2)
    private BigDecimal donGia;
}
