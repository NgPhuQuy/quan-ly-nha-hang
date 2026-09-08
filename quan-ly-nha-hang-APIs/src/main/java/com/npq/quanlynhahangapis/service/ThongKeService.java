package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.response.DoanhThuTheoNgayResponse;
import com.npq.quanlynhahangapis.dto.response.ThongKeTongQuanTrongNgayResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ThongKeService {
    private final HoaDonService hoaDonService;

    public ThongKeTongQuanTrongNgayResponse layTongQuanHomNay(Integer maChiNhanh, LocalDate ngay) {
        if (ngay == null) ngay = LocalDate.now();
        BigDecimal tong = hoaDonService.tongDoanhThuTrongNgay(maChiNhanh, ngay);
        Integer soHoaDonHoanThanh = hoaDonService.soHoaDonBanTrongNgay(maChiNhanh, ngay);
        Integer soHoaDonDaHuy = hoaDonService.soHoaDonDaHuyTrongNgay(maChiNhanh, ngay);
        BigDecimal trungBinhHoaDon = hoaDonService.trungBinhTrenHoaDon(maChiNhanh, ngay);

        return ThongKeTongQuanTrongNgayResponse.builder()
                .tong(tong)
                .soHoaDonHoanThanh(soHoaDonHoanThanh)
                .soHoaDonDaHuy(soHoaDonDaHuy)
                .trungBinhHoaDon(trungBinhHoaDon)
                .build();
    }

    public List<DoanhThuTheoNgayResponse> layDoanhThuTheoNgay(Integer maChiNhanh, LocalDate tuNgay, LocalDate denNgay) {
        return hoaDonService.layDoanhThuTuNgay_DenNgay(maChiNhanh, tuNgay, denNgay);
    }

}

