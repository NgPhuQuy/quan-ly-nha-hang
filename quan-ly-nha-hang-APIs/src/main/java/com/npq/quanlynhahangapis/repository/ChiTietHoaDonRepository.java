package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.ChiTietHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ChiTietHoaDonRepository extends JpaRepository<ChiTietHoaDon, Integer> {
    List<ChiTietHoaDon> findByHoaDon_MaHoaDon(Integer maHoaDon);

    @Query("""
                SELECT SUM(ct.soLuong * ct.donGia)
                FROM ChiTietHoaDon ct
                WHERE ct.hoaDon.maHoaDon = :maHoaDon
            """)
    BigDecimal tinhTienTongHoaDon(@Param("maHoaDon") Integer maHoaDon);
}

