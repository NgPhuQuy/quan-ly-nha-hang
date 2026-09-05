package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    List<HoaDon> findByBan_ChiNhanh_MaChiNhanh(Integer maChiNhanh);
}

