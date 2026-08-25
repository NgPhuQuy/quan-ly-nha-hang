package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.entity.TrangThaiMatHangChiNhanh;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiMatHang;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import com.npq.quanlynhahangapis.repository.MatHangRepository;
import com.npq.quanlynhahangapis.repository.TrangThaiMatHangChiNhanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TrangThaiMatHangChiNhanhService {
    private final TrangThaiMatHangChiNhanhRepository trangThaiMatHangChiNhanhRepository;
    private final MatHangRepository matHangRepository;
    private final ChiNhanhRepository chiNhanhRepository;

    public void sinhTrangThaiMatHangMacDinh(ChiNhanh chiNhanh) {
        trangThaiMatHangChiNhanhRepository
                .saveAll(matHangRepository
                        .findAll()
                        .stream()
                        .map(matHang -> TrangThaiMatHangChiNhanh.builder()
                                .matHang(matHang)
                                .chiNhanh(chiNhanh)
                                .trangThaiMatHang(TrangThaiMatHang.DANG_BAN)
                                .build())
                        .toList());
    }

    public void sinhMonAnChiNhanhMacDinh(MatHang matHang) {
        trangThaiMatHangChiNhanhRepository
                .saveAll(chiNhanhRepository
                        .findAll()
                        .stream()
                        .map(chiNhanh -> TrangThaiMatHangChiNhanh.builder()
                                .matHang(matHang)
                                .chiNhanh(chiNhanh)
                                .trangThaiMatHang(TrangThaiMatHang.DANG_BAN)
                                .build())
                        .toList());
    }
}
