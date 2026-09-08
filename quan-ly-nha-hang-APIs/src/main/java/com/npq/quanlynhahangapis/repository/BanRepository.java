package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.Ban;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BanRepository extends JpaRepository<Ban, Integer> {
    List<Ban> findByChiNhanh_MaChiNhanh(Integer maChiNhanh);
}
