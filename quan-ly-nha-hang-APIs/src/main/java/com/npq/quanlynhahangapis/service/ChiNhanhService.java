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

    public ChiNhanhResponse layChiNhanhTheoID(Integer maChiNhanh) {
        return chuyenSangDto(layChiNhanhTheoId(maChiNhanh));
    }

    public ChiNhanhResponse chiTietChiNhanh(Integer maChiNhanh) {
        return chuyenSangDto(chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND)));
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
        String url = request.anhChiNhanh() != null && !request.anhChiNhanh().isEmpty()
                ? cloudinaryService.taiAnhLenCloudinary(request.anhChiNhanh())
                : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop";

        ChiNhanh chiNhanh = ChiNhanh.builder()
                .tenChiNhanh(request.tenChiNhanh())
                .sucChua(request.sucChua() != null ? request.sucChua() : 50)
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
        ChiNhanh chiNhanh = chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        if (request.tenChiNhanh() != null) chiNhanh.setTenChiNhanh(request.tenChiNhanh());
        if (request.sucChua() != null) chiNhanh.setSucChua(request.sucChua());
        if (request.trangThaiChiNhanh() != null) chiNhanh.setTrangThai(request.trangThaiChiNhanh());
        if (request.soDienThoai() != null) chiNhanh.setSoDienThoai(request.soDienThoai());
        if (request.diaChi() != null) chiNhanh.setDiaChi(request.diaChi());
        if (request.anhChiNhanh() != null && !request.anhChiNhanh().isEmpty()) {
            chiNhanh.setAnhChiNhanh(cloudinaryService.taiAnhLenCloudinary(request.anhChiNhanh()));
        }

        return chuyenSangDto(chiNhanhRepository.save(chiNhanh));
    }

    @Transactional
    public ChiNhanhResponse doiTrangThaiChiNhanh(Integer maChiNhanh) {
        ChiNhanh chiNhanh = chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        chiNhanh.setTrangThai(!chiNhanh.isTrangThai());
        return chuyenSangDto(chiNhanhRepository.save(chiNhanh));
    }

    @Transactional
    public void xoaChiNhanh(Integer maChiNhanh) {
        if (!chiNhanhRepository.existsById(maChiNhanh)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        chiNhanhRepository.deleteById(maChiNhanh);
    }
}
