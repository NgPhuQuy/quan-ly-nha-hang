package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.dto.response.DoanhThuTheoNgayResponse;
import com.npq.quanlynhahangapis.entity.HoaDon;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, Integer> {

    List<HoaDon> findByBan_ChiNhanh_MaChiNhanh(Integer maChiNhanh);

    @Query("""
            SELECT SUM(hd.tongTien)
            FROM HoaDon hd
            WHERE hd.ban.chiNhanh.maChiNhanh = :maChiNhanh
              AND DATE(hd.ngayLapHoaDon) = :ngay
              AND hd.trangThai = TrangThaiHoaDon.HOAN_THANH
            """)
    BigDecimal tinhTongTienTheoChiNhanhTrongNgay(
            @Param("maChiNhanh") Integer maChiNhanh,
            @Param("ngay") LocalDate ngay
    );

    @Query("""
            SELECT COUNT(hd.maHoaDon)
            FROM HoaDon hd
            WHERE hd.ban.chiNhanh.maChiNhanh = :maChiNhanh
              AND DATE(hd.ngayLapHoaDon) = :ngay
              AND hd.trangThai = :trangThai
            """)
    Integer soHoaDonBanTrongNgayTheoTrangThai(
            @Param("maChiNhanh") Integer maChiNhanh,
            @Param("ngay") LocalDate ngay,
            @Param("trangThai") TrangThaiHoaDon trangThai
    );

    @Query("""
            SELECT AVG(hd.tongTien)
            FROM HoaDon hd
            WHERE hd.ban.chiNhanh.maChiNhanh = :maChiNhanh
              AND DATE(hd.ngayLapHoaDon) = :ngay
              AND hd.trangThai = TrangThaiHoaDon.HOAN_THANH
            """)
    BigDecimal trungBinhTrenHoaDon(
            @Param("maChiNhanh") Integer maChiNhanh,
            @Param("ngay") LocalDate ngay
    );

    @Query("""
            SELECT new com.npq.quanlynhahangapis.dto.response.DoanhThuTheoNgayResponse(
                CAST(hd.ngayLapHoaDon AS LocalDate),
                SUM(hd.tongTien)
            )
            FROM HoaDon hd
            WHERE hd.ban.chiNhanh.maChiNhanh = :maChiNhanh
              AND CAST(hd.ngayLapHoaDon AS LocalDate) BETWEEN :tuNgay AND :denNgay
              AND hd.trangThai = TrangThaiHoaDon.HOAN_THANH
            GROUP BY CAST(hd.ngayLapHoaDon AS LocalDate)
            ORDER BY CAST(hd.ngayLapHoaDon AS LocalDate)
            """)
    List<DoanhThuTheoNgayResponse> layDoanhThuTuNgay_DenNgay(
            @Param("maChiNhanh") Integer maChiNhanh,
            @Param("tuNgay") LocalDate tuNgay,
            @Param("denNgay") LocalDate denNgay
    );
}