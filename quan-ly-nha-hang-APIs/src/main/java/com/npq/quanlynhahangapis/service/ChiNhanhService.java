package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.ChiNhanhRequest;
import com.npq.quanlynhahangapis.dto.response.ChiNhanhResponse;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChiNhanhService {
    private final ChiNhanhRepository chiNhanhRepository;
    private final GioHoatDongService gioHoatDongService;

    public List<ChiNhanhResponse> layDSChiNhanh() {
        return chiNhanhRepository
                .findAll()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public ChiNhanh layChiNhanhTheoId(Integer maChiNhanh) {
        return chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    public ChiNhanhResponse layChiNhanhTheoID(Integer maChiNhanh) {
        return chuyenSangDto(layChiNhanhTheoId(maChiNhanh));
    }

    private ChiNhanhResponse chuyenSangDto(ChiNhanh chiNhanh) {
        return ChiNhanhResponse.builder()
                .maChiNhanh(chiNhanh.getMaChiNhanh())
                .tenChiNhanh(chiNhanh.getTenChiNhanh())
                .trangThaiChiNhanh(chiNhanh.isTrangThai())
                .sucChua(chiNhanh.getSucChua())
                .build();
    }

    @Transactional
    public ChiNhanhResponse taoChiNhanh(ChiNhanhRequest request) {
        ChiNhanh chiNhanh = ChiNhanh.builder()
                .tenChiNhanh(request.tenChiNhanh())
                .sucChua(request.sucChua())
                .build();

        chiNhanh = chiNhanhRepository.save(chiNhanh);

        // sinh thoi gian mac dinh cho chi nhanh
        gioHoatDongService.thoiGianMacDinh(chiNhanh);

        return chuyenSangDto(chiNhanh);
    }

    public ChiNhanhResponse capNhatChiNhanh(ChiNhanhRequest request) {
        ChiNhanh chiNhanh = chiNhanhRepository.findById(request.maChiNhanh())
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        chiNhanh.setTenChiNhanh(request.tenChiNhanh());
        chiNhanh.setSucChua(request.sucChua());
        chiNhanh.setTrangThai(request.trangThaiChiNhanh());
        return chuyenSangDto(chiNhanhRepository.save(chiNhanh));
    }

    public ChiNhanhResponse chiTietChiNhanh(Integer maChiNhanh) {
        return chuyenSangDto(chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND)));
    }

//    public ChiNhanhResponse doiTrangThaiChiNhanh(Integer maChiNhanh) {
//        ChiNhanh chiNhanh = chiNhanhRepository.findById(maChiNhanh)
//                .orElseThrow(()-> new AppException(ErrorCode.SOURCE_NOT_FOUND));
//        chiNhanh.setTrangThai();
//        return chuyenSangDto(chiNhanhRepository.save(chiNhanh));
//    }
}
