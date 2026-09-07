package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.ChiTietHoaDonRequest;
import com.npq.quanlynhahangapis.dto.response.ChiTietHoaDonResponse;
import com.npq.quanlynhahangapis.entity.ChiTietHoaDon;
import com.npq.quanlynhahangapis.entity.DatTruoc;
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
        for (ChiTietHoaDonRequest request: requests){
            listChiTietHoaDon.add(taoChiTietHoaDon(hoaDon,request));
        }
        return listChiTietHoaDon;
    }

    public List<ChiTietHoaDonResponse> huyGoiMon(Integer maHoaDon, List<ChiTietHoaDonRequest> listChiTietHD) {
        List<ChiTietHoaDon> list = chiTietHoaDonRepository.findByHoaDon_MaHoaDon(maHoaDon);
        return null;
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
                .maChiTietHoaDon(chiTietHoaDon.getMaChiTietHoaDon())
                .matHang(matHangService.chuyenSangDto(matHang))
                .soLuong(chiTietHoaDon.getSoLuong())
                .build();
    }

    public ChiTietHoaDon chuyenDatTruoc_ChiTietHD(DatTruoc datTruoc, HoaDon hoaDon) {
        ChiTietHoaDon ct = ChiTietHoaDon.builder()
                .matHang(datTruoc.getMatHang())
                .hoaDon(hoaDon)
                .soLuong(datTruoc.getSoLuong())
                .donGia(datTruoc.getDonGia())
                .build();

        return chiTietHoaDonRepository.save(ct);
    }
}
