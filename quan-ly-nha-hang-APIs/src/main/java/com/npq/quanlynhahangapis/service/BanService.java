package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.BanRequest;
import com.npq.quanlynhahangapis.dto.response.BanResponse;
import com.npq.quanlynhahangapis.entity.Ban;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.BanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanService {
    private final BanRepository banRepository;
    private final ChiNhanhService chiNhanhService;

    public List<BanResponse> layDSBan() {
        return banRepository.findAll()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public Ban layBanTheoId(Integer maBan) {
        return banRepository.findById(maBan)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    public BanResponse chiTietBan(Integer maBan) {
        Ban ban = layBanTheoId(maBan);
        return chuyenSangDto(ban);
    }

    @Transactional
    public BanResponse taoBan(BanRequest request) {
        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(request.maChiNhanh());
        Ban ban = Ban.builder()
                .sucChua(request.sucChua())
                .chiNhanh(chiNhanh)
                .build();

        return chuyenSangDto(banRepository.save(ban));
    }

    @Transactional
    public BanResponse capNhatBan(Integer maBan, BanRequest request) {
        Ban ban = layBanTheoId(maBan);
        ban.setSucChua(request.sucChua());
        ban.setTrangThai(request.trangThai());
        return chuyenSangDto(banRepository.save(ban));
    }

    @Transactional
    public BanResponse doiTrangThaiBan(Integer maBan, String trangThai) {
        Ban ban = layBanTheoId(maBan);
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
                .sucChua(ban.getSucChua())
                .maChiNhanh(ban.getChiNhanh().getMaChiNhanh())
                .tenChiNhanh(ban.getChiNhanh().getTenChiNhanh())
                .trangThai(ban.getTrangThai())
                .build();
    }
}
