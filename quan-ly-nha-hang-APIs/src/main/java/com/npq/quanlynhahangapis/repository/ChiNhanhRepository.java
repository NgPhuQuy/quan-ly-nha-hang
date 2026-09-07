package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.ChiNhanh;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChiNhanhRepository extends JpaRepository<ChiNhanh, Integer> {
    List<ChiNhanh> findByTrangThaiTrue();
}
