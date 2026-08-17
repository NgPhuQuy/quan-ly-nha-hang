package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.response.KhuVucResponse;
import com.npq.quanlynhahangapis.entity.KhuVuc;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KhuVucService {
    private final ChiNhanhRepository chiNhanhRepository;

    public List<KhuVucResponse> layDSKhuVuc(Integer maChiNhanh) {
        return chiNhanhRepository.findById(maChiNhanh)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND))
                .getListKhuVuc()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    private KhuVucResponse chuyenSangDto(KhuVuc khuVuc) {
        return KhuVucResponse.builder()
                .maKhuVuc(khuVuc.getMaKhuVuc())
                .tenKhuVuc(khuVuc.getTenKhuVuc())
                .build();
    }
}
