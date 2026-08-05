package com.npq.quanlynhahangapis.repository;

import com.npq.quanlynhahangapis.entity.NguoiDung;
import org.jspecify.annotations.NonNull;
import org.jspecify.annotations.NullMarked;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

@NullMarked
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    @Override
    List<NguoiDung> findAll();
//    Optional<NguoiDung> taoNguoiDung();
//    @Override
//    Optional<NguoiDung> findById(Integer integer);
//


}
