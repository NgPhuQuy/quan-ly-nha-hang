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

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrangThaiMatHangChiNhanhService {
    private final TrangThaiMatHangChiNhanhRepository trangThaiMatHangChiNhanhRepository;
    private final MatHangRepository matHangRepository;
    private final ChiNhanhRepository chiNhanhRepository;

    public void sinhTrangThaiMatHangMacDinh(ChiNhanh chiNhanh) {
        List<MatHang> listMatHang = matHangRepository.findAll();
        for (MatHang matHang : listMatHang) {
            trangThaiMatHangChiNhanhRepository.save(TrangThaiMatHangChiNhanh.builder()
                    .matHang(matHang)
                    .chiNhanh(chiNhanh)
                    .trangThaiMatHang(TrangThaiMatHang.DANG_BAN)
                    .build());
        }
    }

    public void sinhMonAnChiNhanhMacDinh(MatHang matHang) {
        List<ChiNhanh> listChiNhanh = chiNhanhRepository.findAll();
        for (ChiNhanh chiNhanh : listChiNhanh) {
            trangThaiMatHangChiNhanhRepository.save(TrangThaiMatHangChiNhanh.builder()
                    .matHang(matHang)
                    .chiNhanh(chiNhanh)
                    .trangThaiMatHang(TrangThaiMatHang.DANG_BAN)
                    .build());
        }
    }

    public List<TrangThaiMatHangChiNhanh> layDSMatHangDangBanTaiChiNhanh(Integer maChiNhanh, Integer maMatHang) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndMatHang_MaMatHangAndTrangThaiMatHang
                        (maChiNhanh, maMatHang, TrangThaiMatHang.DANG_BAN);
    }
}
