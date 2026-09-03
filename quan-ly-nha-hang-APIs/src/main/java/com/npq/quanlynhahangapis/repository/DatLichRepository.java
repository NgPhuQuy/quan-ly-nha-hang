package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.dto.response.KhungGioResponse;
import com.npq.quanlynhahangapis.entity.DatLich;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface DatLichRepository extends JpaRepository<DatLich, Integer> {
    @Query("""
            SELECT new com.npq.quanlynhahangapis.dto.response.KhungGioResponse(d.gio, d.chiNhanh.soLuongDon - COUNT(d))
            FROM DatLich d
            WHERE d.chiNhanh.maChiNhanh = :maChiNhanh
            AND d.ngay = :ngay
            AND d.trangThai IN (com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich.DA_XAC_NHAN)
            GROUP BY d.gio
            ORDER BY d.gio
            """)
    List<KhungGioResponse> countDatLichTheoGio(@Param("maChiNhanh") Integer maChiNhanh,
                                               @Param("ngay") LocalDate ngay);
}
