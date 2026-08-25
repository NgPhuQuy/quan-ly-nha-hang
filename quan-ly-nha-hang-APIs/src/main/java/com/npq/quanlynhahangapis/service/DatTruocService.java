package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.dto.response.DatTruocResponse;
import com.npq.quanlynhahangapis.entity.DatTruoc;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.repository.DatTruocRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class DatTruocService {
    private final DatTruocRepository datTruocRepository;

    public DatTruocResponse chuyenSangDto(DatTruoc dto) {
        MatHang matHang = dto.getMatHang();
        return DatTruocResponse.builder()
                .maDatLich(dto.getDatLich().getMaDatLich())
                .maMatHang(matHang.getMaMatHang())
                .tenMatHang(matHang.getTenMatHang())
                .soLuong(dto.getSoLuong())
                .donGia(dto.getDonGia())
                .build();
    }
}
