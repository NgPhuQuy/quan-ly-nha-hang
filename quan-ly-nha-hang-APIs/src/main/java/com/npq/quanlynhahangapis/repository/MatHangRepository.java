package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.MatHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatHangRepository extends JpaRepository<MatHang, Integer> {
    @Query("""
            SELECT mh
            FROM MatHang mh
            JOIN mh.listTrangThai tt
            WHERE tt.chiNhanh.maChiNhanh = :maChiNhanh
            AND tt.trangThaiMatHang = "DANG_BAN"
            """)
    List<MatHang> layDanhSachMatHangOKChiNhanh(Integer maChiNhanh);
}
