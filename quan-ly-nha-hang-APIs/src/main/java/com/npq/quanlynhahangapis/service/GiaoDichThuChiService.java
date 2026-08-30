package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.GiaoDichThuChiRequest;
import com.npq.quanlynhahangapis.dto.response.GiaoDichThuChiResponse;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.entity.GiaoDichThuChi;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import com.npq.quanlynhahangapis.repository.GiaoDichThuChiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class GiaoDichThuChiService {
    private final GiaoDichThuChiRepository giaoDichThuChiRepository;
    private final ChiNhanhRepository chiNhanhRepository;

    public List<GiaoDichThuChiResponse> layDSGiaoDich(String loai, Integer maChiNhanh) {
        List<GiaoDichThuChi> list = giaoDichThuChiRepository.findAllOrderByNgayGiaoDichDesc();

        return list.stream()
                .filter(g -> loai == null || loai.isBlank() || "Tất cả".equalsIgnoreCase(loai) || g.getLoai().equalsIgnoreCase(loai))
                .filter(g -> maChiNhanh == null || (g.getChiNhanh() != null && g.getChiNhanh().getMaChiNhanh().equals(maChiNhanh)))
                .map(this::chuyenSangDto)
                .toList();
    }

    @Transactional
    public GiaoDichThuChiResponse taoGiaoDich(GiaoDichThuChiRequest request) {
        ChiNhanh chiNhanh = null;
        String tenChiNhanh = "Quận 1";
        if (request.maChiNhanh() != null) {
            chiNhanh = chiNhanhRepository.findById(request.maChiNhanh()).orElse(null);
            if (chiNhanh != null) tenChiNhanh = chiNhanh.getTenChiNhanh();
        }

        String maCode = "TC-" + String.format("%03d", 1 + new Random().nextInt(999));

        GiaoDichThuChi giaoDich = GiaoDichThuChi.builder()
                .maGiaoDichCode(maCode)
                .loai(request.loai() != null ? request.loai() : "Thu")
                .danhMuc(request.danhMuc() != null ? request.danhMuc() : "Khác")
                .moTa(request.moTa())
                .soTien(request.soTien())
                .ngayGiaoDich(request.ngayGiaoDich() != null ? request.ngayGiaoDich() : LocalDate.now())
                .ghiChu(request.ghiChu())
                .chiNhanh(chiNhanh)
                .tenChiNhanh(tenChiNhanh)
                .build();

        return chuyenSangDto(giaoDichThuChiRepository.save(giaoDich));
    }

    @Transactional
    public void xoaGiaoDich(Integer maGiaoDich) {
        if (!giaoDichThuChiRepository.existsById(maGiaoDich)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        giaoDichThuChiRepository.deleteById(maGiaoDich);
    }

    public GiaoDichThuChiResponse chuyenSangDto(GiaoDichThuChi g) {
        return GiaoDichThuChiResponse.builder()
                .maGiaoDich(g.getMaGiaoDich())
                .maGiaoDichCode(g.getMaGiaoDichCode() != null ? g.getMaGiaoDichCode() : "TC-" + g.getMaGiaoDich())
                .loai(g.getLoai())
                .danhMuc(g.getDanhMuc())
                .moTa(g.getMoTa())
                .soTien(g.getSoTien())
                .ngayGiaoDich(g.getNgayGiaoDich())
                .ghiChu(g.getGhiChu())
                .maChiNhanh(g.getChiNhanh() != null ? g.getChiNhanh().getMaChiNhanh() : null)
                .tenChiNhanh(g.getTenChiNhanh() != null ? g.getTenChiNhanh() : (g.getChiNhanh() != null ? g.getChiNhanh().getTenChiNhanh() : "Quận 1"))
                .build();
    }
}

