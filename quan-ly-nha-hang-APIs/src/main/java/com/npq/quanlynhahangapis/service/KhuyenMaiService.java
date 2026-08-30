package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.KhuyenMaiRequest;
import com.npq.quanlynhahangapis.dto.response.KhuyenMaiResponse;
import com.npq.quanlynhahangapis.entity.KhuyenMai;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.KhuyenMaiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KhuyenMaiService {
    private final KhuyenMaiRepository khuyenMaiRepository;

    public List<KhuyenMaiResponse> layDSKhuyenMai(String trangThai) {
        List<KhuyenMai> list = khuyenMaiRepository.findAll();

        return list.stream()
                .filter(km -> trangThai == null || trangThai.isBlank() || "Tất cả".equalsIgnoreCase(trangThai) || km.getTrangThai().equalsIgnoreCase(trangThai))
                .map(this::chuyenSangDto)
                .toList();
    }

    public KhuyenMaiResponse layTheoId(Integer maKhuyenMai) {
        return khuyenMaiRepository.findById(maKhuyenMai)
                .map(this::chuyenSangDto)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    @Transactional
    public KhuyenMaiResponse taoKhuyenMai(KhuyenMaiRequest request) {
        KhuyenMai km = KhuyenMai.builder()
                .tenKhuyenMai(request.tenKhuyenMai())
                .loaiKhuyenMai(request.loaiKhuyenMai() != null ? request.loaiKhuyenMai() : "Giảm %")
                .giaTri(request.giaTri() != null ? request.giaTri() : "10%")
                .ngayBatDau(request.ngayBatDau())
                .ngayKetThuc(request.ngayKetThuc())
                .trangThai(request.trangThai() != null ? request.trangThai() : "Đang chạy")
                .soLuotDung(0)
                .build();

        return chuyenSangDto(khuyenMaiRepository.save(km));
    }

    @Transactional
    public KhuyenMaiResponse capNhatKhuyenMai(Integer maKhuyenMai, KhuyenMaiRequest request) {
        KhuyenMai km = khuyenMaiRepository.findById(maKhuyenMai)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        if (request.tenKhuyenMai() != null) km.setTenKhuyenMai(request.tenKhuyenMai());
        if (request.loaiKhuyenMai() != null) km.setLoaiKhuyenMai(request.loaiKhuyenMai());
        if (request.giaTri() != null) km.setGiaTri(request.giaTri());
        if (request.ngayBatDau() != null) km.setNgayBatDau(request.ngayBatDau());
        if (request.ngayKetThuc() != null) km.setNgayKetThuc(request.ngayKetThuc());
        if (request.trangThai() != null) km.setTrangThai(request.trangThai());

        return chuyenSangDto(khuyenMaiRepository.save(km));
    }

    @Transactional
    public KhuyenMaiResponse doiTrangThai(Integer maKhuyenMai, String trangThai) {
        KhuyenMai km = khuyenMaiRepository.findById(maKhuyenMai)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        km.setTrangThai(trangThai);
        return chuyenSangDto(khuyenMaiRepository.save(km));
    }

    @Transactional
    public void xoaKhuyenMai(Integer maKhuyenMai) {
        if (!khuyenMaiRepository.existsById(maKhuyenMai)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        khuyenMaiRepository.deleteById(maKhuyenMai);
    }

    public KhuyenMaiResponse chuyenSangDto(KhuyenMai km) {
        return KhuyenMaiResponse.builder()
                .maKhuyenMai(km.getMaKhuyenMai())
                .tenKhuyenMai(km.getTenKhuyenMai())
                .loaiKhuyenMai(km.getLoaiKhuyenMai())
                .giaTri(km.getGiaTri())
                .ngayBatDau(km.getNgayBatDau())
                .ngayKetThuc(km.getNgayKetThuc())
                .trangThai(km.getTrangThai())
                .soLuotDung(km.getSoLuotDung() != null ? km.getSoLuotDung() : 0)
                .build();
    }
}

