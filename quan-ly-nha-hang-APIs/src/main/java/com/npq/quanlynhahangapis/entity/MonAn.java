package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class MonAn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maMonAn;
    private String tenMonAn;
    @Column(precision = 12,scale = 2)
    private BigDecimal giaMonAn;

}
