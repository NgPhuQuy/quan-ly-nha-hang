package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, Integer> {
    List<KhuyenMai> findByTrangThai(String trangThai);
}

