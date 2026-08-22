package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatTruocRequest;
import com.npq.quanlynhahangapis.dto.response.DatTruocResponse;
import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.DatTruoc;
import com.npq.quanlynhahangapis.repository.DatTruocRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class DatTruocService {
    private final DatTruocRepository datTruocRepository;


    public DatTruocResponse datTruocMonAn(DatTruocRequest request) {
        DatTruoc dt = DatTruoc.builder()
                .datLich(request.datLich())
                .matHang(request.matHang())
                .soLuong(request.soLuong())
                .donGia(request.donGia())
                .build();

        return chuyenSangDto(datTruocRepository.save(dt));
    }

    private DatTruocResponse chuyenSangDto(DatTruoc dto){
        return DatTruocResponse.builder()
                .datLich(dto.getDatLich())
                .matHang(dto.getMatHang())
                .soLuong(dto.getSoLuong())
                .donGia(dto.getDonGia())
                .build();
    }
}
