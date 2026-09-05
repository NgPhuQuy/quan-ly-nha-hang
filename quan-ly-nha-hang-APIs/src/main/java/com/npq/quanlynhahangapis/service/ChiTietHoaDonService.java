package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.response.ChiTietHoaDonResponse;
import com.npq.quanlynhahangapis.entity.ChiTietHoaDon;
import com.npq.quanlynhahangapis.entity.HoaDon;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.repository.ChiTietHoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public ChiTietHoaDonResponse chuyenSangDto(ChiTietHoaDon chiTietHoaDon) {
        MatHang matHang = matHangService.layMatHangTheoId(chiTietHoaDon.getMatHang().getMaMatHang());
        return ChiTietHoaDonResponse.builder()
                .maChiTietHoaDon(chiTietHoaDon.getMaChiTietHoaDon())
                .maMatHang(matHang.getMaMatHang())
                .tenMatHang(matHang.getTenMatHang())
                .anhMinhHoa(matHang.getAnhMinhHoa())
                .soLuong(chiTietHoaDon.getSoLuong())
                .donGia(chiTietHoaDon.getDonGia())
                .build();
    }
}
