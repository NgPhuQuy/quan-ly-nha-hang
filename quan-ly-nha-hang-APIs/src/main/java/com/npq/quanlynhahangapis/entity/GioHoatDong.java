package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GioHoatDong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maGioHoatDong;

    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh", nullable = false)
    private ChiNhanh chiNhanh;

    @Enumerated(EnumType.STRING)
    private DayOfWeek thu;
    private LocalTime gioMoCua;
    private LocalTime gioDongCua;
    private Boolean hoatDong;
}