package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {
    Optional<HoaDon> findByMaHoaDonCode(String maHoaDonCode);

    List<HoaDon> findByChiNhanh_MaChiNhanh(Integer maChiNhanh);

    List<HoaDon> findByChiNhanh_MaChiNhanhAndTrangThai(Integer maChiNhanh, String trangThai);

    List<HoaDon> findByTrangThai(String trangThai);

    @Query("SELECT h FROM HoaDon h WHERE h.ngayLapHoaDon BETWEEN :from AND :to")
    List<HoaDon> findByNgayLapHoaDonBetween(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to);

    @Query("SELECT h FROM HoaDon h WHERE h.khachHang.maKhachHang = :maKhachHang")
    List<HoaDon> findByMaKhachHang(@Param("maKhachHang") Integer maKhachHang);

    @Query("SELECT h FROM HoaDon h ORDER BY h.ngayLapHoaDon DESC")
    List<HoaDon> findAllOrderByNgayLapHoaDonDesc();
}

