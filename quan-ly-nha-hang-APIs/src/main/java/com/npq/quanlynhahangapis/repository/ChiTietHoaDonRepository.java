package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.ChiTietHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Integer> {
    List<ChiTietHoaDon> findByHoaDon_MaHoaDon(Integer maHoaDon);
}

