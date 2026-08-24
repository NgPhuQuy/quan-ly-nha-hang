package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.response.BanResponse;
import com.npq.quanlynhahangapis.entity.Ban;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.BanRepository;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BanService {
    private final BanRepository banRepository;
    private final ChiNhanhRepository chiNhanhRepository;

    public List<BanResponse> layDSBan(Integer maChiNhanh) {
        return chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND))
                .getListBan()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    private BanResponse chuyenSangDto(Ban ban) {
        return BanResponse.builder()
                .maBan(ban.getMaBan())
                .soBan(ban.getSoBan())
                .build();
    }
}
