package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.PK.MaTrangThaiMatHangChiNhanh;
import com.npq.quanlynhahangapis.entity.TrangThaiMatHangChiNhanh;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiMatHang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrangThaiMatHangChiNhanhRepository extends
        JpaRepository<TrangThaiMatHangChiNhanh, MaTrangThaiMatHangChiNhanh> {
    List<TrangThaiMatHangChiNhanh> findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(
            Integer maChiNhanh,
            TrangThaiMatHang trangThaiMatHang
    );
}
