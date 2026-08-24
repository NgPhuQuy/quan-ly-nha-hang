package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.GioHoatDong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GioHoatDongRepository extends JpaRepository<GioHoatDong, Integer> {
    List<GioHoatDong> findByChiNhanh_MaChiNhanh(Integer maChiNhanh);
}
