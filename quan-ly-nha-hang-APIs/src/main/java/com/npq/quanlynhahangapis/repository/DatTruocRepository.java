package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.DatTruoc;
import com.npq.quanlynhahangapis.entity.PK.MaDatTruoc;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatTruocRepository extends JpaRepository<DatTruoc, MaDatTruoc> {
}
