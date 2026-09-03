package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import com.npq.quanlynhahangapis.repository.DatLichRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DatLichScheduledJob {
    private final DatLichRepository datLichRepository;
    private final DatLichService datLichService;

    @Scheduled(fixedRate = 10 * 60 * 1000)
    @Transactional
    public void tuDongDanhDauVangMat() {
        List<DatLich> danhSachQuaGio = datLichService.danhSachDatLichQuaGio();

        if (danhSachQuaGio.isEmpty()) return;

        danhSachQuaGio.forEach(d -> d.setTrangThai(TrangThaiDatLich.VANG_MAT));
        datLichRepository.saveAll(danhSachQuaGio);
    }
}
