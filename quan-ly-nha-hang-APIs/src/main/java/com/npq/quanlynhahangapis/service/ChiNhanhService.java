package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.response.ChiNhanhResponse;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.repository.ChiNhanhRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChiNhanhService {
    private final ChiNhanhRepository chiNhanhRepository;

    public List<ChiNhanhResponse> layDSChiNhanh() {
        return chiNhanhRepository
                .findAll()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    private ChiNhanhResponse chuyenSangDto(ChiNhanh chiNhanh) {
        return ChiNhanhResponse.builder()
                .maChiNhanh(chiNhanh.getMaChiNhanh())
                .tenChiNhanh(chiNhanh.getTenChiNhanh())
                .build();
    }
}
