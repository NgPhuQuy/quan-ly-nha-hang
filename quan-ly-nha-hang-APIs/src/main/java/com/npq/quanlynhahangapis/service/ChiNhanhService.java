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
    private final TrangThaiMatHangChiNhanhService trangThaiMatHangChiNhanhService;
    private final CloudinaryService cloudinaryService;

    public List<ChiNhanhResponse> layDSChiNhanh() {
        return chiNhanhRepository
                .findAll()
                .stream()
                .filter(ChiNhanh::isTrangThai)
                .map(this::chuyenSangDto)
                .toList();
    }

    public List<ChiNhanhResponse> layTatCaChiNhanh() {
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

    public ChiNhanhResponse chiTietChiNhanh(Integer maChiNhanh) {
        return chuyenSangDto(layChiNhanhTheoId(maChiNhanh));
    }

    private ChiNhanhResponse chuyenSangDto(ChiNhanh chiNhanh) {
        return ChiNhanhResponse.builder()
                .maChiNhanh(chiNhanh.getMaChiNhanh())
                .tenChiNhanh(chiNhanh.getTenChiNhanh())
                .trangThaiChiNhanh(chiNhanh.isTrangThai())
                .sucChua(chiNhanh.getSucChua())
                .soDienThoai(chiNhanh.getSoDienThoai())
                .diaChi(chiNhanh.getDiaChi())
                .anhChiNhanh(chiNhanh.getAnhChiNhanh())
                .build();
    }

    @Transactional
    public ChiNhanhResponse taoChiNhanh(ChiNhanhRequest request) {
        String url = cloudinaryService.taiAnhLenCloudinary(request.anhChiNhanh());

        ChiNhanh chiNhanh = ChiNhanh.builder()
                .tenChiNhanh(request.tenChiNhanh())
                .sucChua(request.sucChua())
                .soDienThoai(request.soDienThoai())
                .diaChi(request.diaChi())
                .anhChiNhanh(url)
                .build();
        chiNhanh = chiNhanhRepository.save(chiNhanh);

        gioHoatDongService.thoiGianMacDinh(chiNhanh);
        trangThaiMatHangChiNhanhService.sinhTrangThaiMatHangMacDinh(chiNhanh);

        return chuyenSangDto(chiNhanh);
    }

    @Transactional
    public ChiNhanhResponse capNhatChiNhanh(Integer maChiNhanh, ChiNhanhRequest request) {
        ChiNhanh chiNhanh = layChiNhanhTheoId(maChiNhanh);

        chiNhanh.setTenChiNhanh(request.tenChiNhanh());
        chiNhanh.setSucChua(request.sucChua());
        chiNhanh.setSoDienThoai(request.soDienThoai());
        chiNhanh.setDiaChi(request.diaChi());

        if (!request.anhChiNhanh().isEmpty()) {
            chiNhanh.setAnhChiNhanh(cloudinaryService.taiAnhLenCloudinary(request.anhChiNhanh()));
        }

        return chuyenSangDto(chiNhanhRepository.save(chiNhanh));
    }

    @Transactional
    public ChiNhanhResponse doiTrangThaiChiNhanh(Integer maChiNhanh) {
        ChiNhanh chiNhanh = layChiNhanhTheoId(maChiNhanh);
        chiNhanh.setTrangThai(!chiNhanh.isTrangThai());
        return chuyenSangDto(chiNhanhRepository.save(chiNhanh));
    }

}
