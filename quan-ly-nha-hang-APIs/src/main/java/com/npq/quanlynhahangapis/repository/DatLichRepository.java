package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public interface DatLichRepository extends JpaRepository<DatLich, Integer> {
    List<DatLich> findByChiNhanh_MaChiNhanhAndNgayAndTrangThaiNotIn(
            Integer maChiNhanh, LocalDate ngay, Collection<TrangThaiDatLich> excludedStatuses
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT d FROM DatLich d WHERE d.chiNhanh.maChiNhanh = :maChiNhanh " +
            "AND d.ngay = :ngay AND d.trangThai NOT IN :trangThaiLoaiTru")
    List<DatLich> findByChiNhanh_MaChiNhanhAndNgayAndTrangThaiNotInForUpdate(
            @Param("maChiNhanh") Integer maChiNhanh,
            @Param("ngay") LocalDate ngay,
            @Param("trangThaiLoaiTru") Collection<TrangThaiDatLich> trangThaiLoaiTru
    );
}
