package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.DatLich;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DatLichRepository extends JpaRepository<DatLich, Integer> {
    List<DatLich> findByChiNhanh_MaChiNhanhAndNgay(Integer integer, LocalDate ngay);
}
