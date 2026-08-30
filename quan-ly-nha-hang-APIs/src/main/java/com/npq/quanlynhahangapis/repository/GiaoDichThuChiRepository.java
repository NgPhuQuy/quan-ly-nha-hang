package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.GiaoDichThuChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface GiaoDichThuChiRepository extends JpaRepository<GiaoDichThuChi, Integer> {
    List<GiaoDichThuChi> findByLoai(String loai);

    List<GiaoDichThuChi> findByChiNhanh_MaChiNhanh(Integer maChiNhanh);

    @Query("SELECT g FROM GiaoDichThuChi g WHERE g.ngayGiaoDich BETWEEN :from AND :to ORDER BY g.ngayGiaoDich DESC")
    List<GiaoDichThuChi> findByNgayGiaoDichBetween(@Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("SELECT g FROM GiaoDichThuChi g ORDER BY g.ngayGiaoDich DESC")
    List<GiaoDichThuChi> findAllOrderByNgayGiaoDichDesc();
}

