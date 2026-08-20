package com.npq.quanlynhahangapis.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class MonAn_ChiNhanh {
    @EmbeddedId
    @ManyToOne
    @JoinColumn(name = "ma_mon_an")
    private MonAn monAn;
    @ManyToOne
    @JoinColumn(name = "ma_chi_nhanh")
    private ChiNhanh chiNhanh;
    private boolean trangThai;
}
