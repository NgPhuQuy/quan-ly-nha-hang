package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.BanRequest;
import com.npq.quanlynhahangapis.dto.response.BanResponse;
import com.npq.quanlynhahangapis.entity.Ban;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.BanRepository;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanService {
    private final BanRepository banRepository;
    private final ChiNhanhRepository chiNhanhRepository;

    public List<BanResponse> layDSBan(Integer maChiNhanh) {
        if (maChiNhanh != null) {
            return banRepository.findByChiNhanh_MaChiNhanh(maChiNhanh)
                    .stream()
                    .map(this::chuyenSangDto)
                    .toList();
        }
        return banRepository.findAll()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public List<BanResponse> layDSBanTheoTrangThai(Integer maChiNhanh, String trangThai) {
        if (maChiNhanh != null && trangThai != null && !trangThai.isBlank()) {
            return banRepository.findByChiNhanh_MaChiNhanhAndTrangThai(maChiNhanh, trangThai)
                    .stream()
                    .map(this::chuyenSangDto)
                    .toList();
        } else if (maChiNhanh != null) {
            return layDSBan(maChiNhanh);
        } else if (trangThai != null && !trangThai.isBlank()) {
            return banRepository.findByTrangThai(trangThai)
                    .stream()
                    .map(this::chuyenSangDto)
                    .toList();
        }
        return layDSBan(null);
    }

    public BanResponse layBanTheoId(Integer maBan) {
        Ban ban = banRepository.findById(maBan)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        return chuyenSangDto(ban);
    }

    @Transactional
    public BanResponse taoBan(BanRequest request) {
        ChiNhanh chiNhanh = null;
        if (request.maChiNhanh() != null) {
            chiNhanh = chiNhanhRepository.findById(request.maChiNhanh())
                    .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
        }

        Ban ban = Ban.builder()
                .soBan(request.soBan())
                .sucChua(request.sucChua() != null ? request.sucChua() : 4)
                .trangThai(request.trangThai() != null ? request.trangThai() : "Trống")
                .chiNhanh(chiNhanh)
                .build();

        return chuyenSangDto(banRepository.save(ban));
    }

    @Transactional
    public BanResponse capNhatBan(Integer maBan, BanRequest request) {
        Ban ban = banRepository.findById(maBan)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        if (request.soBan() != null) ban.setSoBan(request.soBan());
        if (request.sucChua() != null) ban.setSucChua(request.sucChua());
        if (request.trangThai() != null) ban.setTrangThai(request.trangThai());
        if (request.maChiNhanh() != null) {
            ChiNhanh chiNhanh = chiNhanhRepository.findById(request.maChiNhanh())
                    .orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
            ban.setChiNhanh(chiNhanh);
        }

        return chuyenSangDto(banRepository.save(ban));
    }

    @Transactional
    public BanResponse doiTrangThaiBan(Integer maBan, String trangThai) {
        Ban ban = banRepository.findById(maBan)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        ban.setTrangThai(trangThai);
        return chuyenSangDto(banRepository.save(ban));
    }

    @Transactional
    public void xoaBan(Integer maBan) {
        if (!banRepository.existsById(maBan)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        banRepository.deleteById(maBan);
    }

    public BanResponse chuyenSangDto(Ban ban) {
        return BanResponse.builder()
                .maBan(ban.getMaBan())
                .soBan(ban.getSoBan())
                .sucChua(ban.getSucChua())
                .maChiNhanh(ban.getChiNhanh() != null ? ban.getChiNhanh().getMaChiNhanh() : null)
                .tenChiNhanh(ban.getChiNhanh() != null ? ban.getChiNhanh().getTenChiNhanh() : "5S Dining")
                .trangThai(ban.getTrangThai() != null ? ban.getTrangThai() : "Trống")
                .build();
    }
}
