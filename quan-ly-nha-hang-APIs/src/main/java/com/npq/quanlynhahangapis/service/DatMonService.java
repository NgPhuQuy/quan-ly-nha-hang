package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatMonRequest;
import com.npq.quanlynhahangapis.dto.response.DatMonResponse;
import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.DatMon;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.repository.DatMonRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class DatMonService {
    private final DatMonRepository datMonRepository;
    private final MatHangService matHangService;

    public DatMon chuyenSangObj(DatMonRequest request, DatLich datLich) {
        MatHang matHang = matHangService.layMatHangTheoId(request.maMatHang());
        DatMon datMon = DatMon.builder()
                .datLich(datLich)
                .matHang(matHang)
                .soLuong(request.soLuong())
                .donGia(matHang.getGiaMatHang())
                .build();
        return datMonRepository.save(datMon);
    }

    public DatMonResponse chuyenSangDto(DatMon dto) {
        MatHang matHang = dto.getMatHang();
        return DatMonResponse.builder()
                .matHang(matHangService.chuyenSangDto(matHang))
                .soLuong(dto.getSoLuong())
                .donGia(dto.getDonGia())
                .build();
    }

}
