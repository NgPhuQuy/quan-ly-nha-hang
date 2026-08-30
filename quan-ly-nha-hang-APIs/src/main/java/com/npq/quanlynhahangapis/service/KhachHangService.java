package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.response.KhachHangResponse;
import com.npq.quanlynhahangapis.entity.HoaDon;
import com.npq.quanlynhahangapis.entity.KhachHang;
import com.npq.quanlynhahangapis.entity.NguoiDung;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.HoaDonRepository;
import com.npq.quanlynhahangapis.repository.KhachHangRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class KhachHangService {
    private final KhachHangRepository khachHangRepository;
    private final HoaDonRepository hoaDonRepository;

    public List<KhachHangResponse> layDSKhachHang(String keyword) {
        List<KhachHang> list = khachHangRepository.findAll();

        return list.stream()
                .filter(kh -> {
                    if (keyword == null || keyword.isBlank()) return true;
                    String s = keyword.toLowerCase().trim();
                    NguoiDung u = kh.getNguoiDung();
                    if (u == null) return false;
                    boolean matchName = (u.getHo() != null && u.getHo().toLowerCase().contains(s))
                            || (u.getTen() != null && u.getTen().toLowerCase().contains(s))
                            || (u.getTaiKhoan() != null && u.getTaiKhoan().toLowerCase().contains(s));
                    boolean matchPhone = u.getSoDienThoai() != null && u.getSoDienThoai().contains(s);
                    boolean matchEmail = u.getEmail() != null && u.getEmail().toLowerCase().contains(s);
                    return matchName || matchPhone || matchEmail;
                })
                .map(this::chuyenSangDto)
                .toList();
    }

    public KhachHangResponse layKhachHangTheoId(Integer maKhachHang) {
        KhachHang kh = khachHangRepository.findById(maKhachHang)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        return chuyenSangDto(kh);
    }

    private KhachHangResponse chuyenSangDto(KhachHang kh) {
        NguoiDung u = kh.getNguoiDung();
        String hoTen = "";
        String sdt = "";
        String email = "";

        if (u != null) {
            hoTen = ((u.getHo() != null ? u.getHo() + " " : "") + (u.getTen() != null ? u.getTen() : "")).trim();
            if (hoTen.isEmpty()) hoTen = u.getTaiKhoan() != null ? u.getTaiKhoan() : "Khách hàng";
            sdt = u.getSoDienThoai() != null ? u.getSoDienThoai() : "";
            email = u.getEmail() != null ? u.getEmail() : "";
        }

        List<HoaDon> hoaDons = hoaDonRepository.findByMaKhachHang(kh.getMaKhachHang());
        int soDon = hoaDons.size();

        BigDecimal tongChiTieu = hoaDons.stream()
                .filter(h -> "Hoàn thành".equalsIgnoreCase(h.getTrangThai()))
                .map(h -> h.getTongTien() != null ? h.getTongTien() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        String lanCuoiGhe = hoaDons.stream()
                .map(HoaDon::getNgayLapHoaDon)
                .filter(java.util.Objects::nonNull)
                .max(java.time.LocalDateTime::compareTo)
                .map(dt -> dt.toLocalDate().toString())
                .orElse("—");

        return KhachHangResponse.builder()
                .maKhachHang(kh.getMaKhachHang())
                .hoTen(hoTen)
                .soDienThoai(sdt)
                .email(email)
                .diemTichLuy(kh.getDiemTichLuy() != null ? kh.getDiemTichLuy() : 0)
                .soDon(soDon)
                .tongChiTieu(tongChiTieu)
                .lanCuoiGhe(lanCuoiGhe)
                .build();
    }
}

