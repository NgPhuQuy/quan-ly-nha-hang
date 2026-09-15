package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.DatMon;
import com.npq.quanlynhahangapis.entity.PK.MaDatMon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatMonRepository extends JpaRepository<DatMon, MaDatMon> {
}
