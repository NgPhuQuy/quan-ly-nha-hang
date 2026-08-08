package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ban {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int maBan;

    @Column(length = 20)
    private String soBan; // bao gom thong tin co ban vd: VIP-0001, OUTSIDE-0001
    private int sucChua;

    @ManyToOne
    @JoinColumn(name = "ma_khu_vuc", nullable = false)
    private KhuVuc khuVuc;

}
