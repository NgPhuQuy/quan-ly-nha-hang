package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.ChiTietHoaDonRequest;
import com.npq.quanlynhahangapis.dto.response.ChiTietHoaDonResponse;
import com.npq.quanlynhahangapis.entity.ChiTietHoaDon;
import com.npq.quanlynhahangapis.entity.DatMon;
import com.npq.quanlynhahangapis.entity.HoaDon;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.repository.ChiTietHoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChiTietHoaDonService {
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final MatHangService matHangService;

    public BigDecimal layTongTien(Integer maHoaDon) {
        return chiTietHoaDonRepository.tinhTienTongHoaDon(maHoaDon);
    }

    public List<ChiTietHoaDonResponse> danhSachChiTietHoaDon(HoaDon hoaDon) {
        return chiTietHoaDonRepository
                .findByHoaDon_MaHoaDon(hoaDon.getMaHoaDon())
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public List<ChiTietHoaDon> goiMon(HoaDon hoaDon, List<ChiTietHoaDonRequest> requests) {
        List<ChiTietHoaDon> listChiTietHoaDon = new ArrayList<>();
        for (ChiTietHoaDonRequest request : requests) {
            ChiTietHoaDon chiTiet = chiTietHoaDonRepository
                    .findByHoaDon_MaHoaDonAndMatHang_MaMatHang(hoaDon.getMaHoaDon(), request.maMatHang())
                    .orElse(null);
            if (chiTiet != null && !request.soLuong().equals(0)) {
                chiTiet.setSoLuong(chiTiet.getSoLuong() + request.soLuong());
                chiTietHoaDonRepository.save(chiTiet);
            } else {
                chiTiet = taoChiTietHoaDon(hoaDon, request);
                listChiTietHoaDon.add(chiTiet);
            }
        }
        return listChiTietHoaDon;
    }

    public ChiTietHoaDon taoChiTietHoaDon(HoaDon hoaDon, ChiTietHoaDonRequest request) {
        MatHang matHang = matHangService.layMatHangTheoId(request.maMatHang());
        ChiTietHoaDon chiTietHoaDon = ChiTietHoaDon.builder()
                .matHang(matHang)
                .hoaDon(hoaDon)
                .soLuong(request.soLuong())
                .donGia(matHang.getGiaMatHang())
                .build();
        return chiTietHoaDonRepository.save(chiTietHoaDon);
    }

    public ChiTietHoaDonResponse chuyenSangDto(ChiTietHoaDon chiTietHoaDon) {
        MatHang matHang = matHangService.layMatHangTheoId(chiTietHoaDon.getMatHang().getMaMatHang());
        return ChiTietHoaDonResponse.builder()
                .matHang(matHangService.chuyenSangDto(matHang))
                .soLuong(chiTietHoaDon.getSoLuong())
                .build();
    }

    public ChiTietHoaDon chuyenDatMon_ChiTietHD(DatMon datMon, HoaDon hoaDon) {
        ChiTietHoaDon ct = ChiTietHoaDon.builder()
                .matHang(datMon.getMatHang())
                .hoaDon(hoaDon)
                .soLuong(datMon.getSoLuong())
                .donGia(datMon.getDonGia())
                .build();

        return chiTietHoaDonRepository.save(ct);
    }
}
