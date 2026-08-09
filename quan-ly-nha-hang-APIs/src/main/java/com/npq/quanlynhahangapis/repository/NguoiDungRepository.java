package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.NguoiDung;
import org.jspecify.annotations.NullMarked;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@NullMarked
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    Optional<NguoiDung> findByTaiKhoan(String taiKhoan);

    boolean existsByTaiKhoan(String taiKhoan);

    boolean existsByEmail(String email);

    boolean existsBySoDienThoai(String soDienThoai);
}
