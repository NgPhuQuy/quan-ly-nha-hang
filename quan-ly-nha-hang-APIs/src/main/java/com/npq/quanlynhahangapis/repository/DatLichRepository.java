package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface DatLichRepository extends JpaRepository<DatLich, Integer> {
    List<DatLich> findByChiNhanh_MaChiNhanhAndNgayAndTrangThaiNotIn(
            Integer maChiNhanh, LocalDate ngay, Collection<TrangThaiDatLich> excludedStatuses
    );


}
