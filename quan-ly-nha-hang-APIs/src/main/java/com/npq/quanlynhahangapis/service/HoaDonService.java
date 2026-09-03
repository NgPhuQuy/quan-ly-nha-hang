package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.HoaDonRequest;
import com.npq.quanlynhahangapis.dto.response.ChiTietHoaDonResponse;
import com.npq.quanlynhahangapis.dto.response.HoaDonResponse;
import com.npq.quanlynhahangapis.entity.*;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiHoaDon;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.BanRepository;
import com.npq.quanlynhahangapis.repository.ChiTietHoaDonRepository;
import com.npq.quanlynhahangapis.repository.HoaDonRepository;
import com.npq.quanlynhahangapis.repository.MatHangRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HoaDonService {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    private final HoaDonRepository hoaDonRepository;
    private final ChiTietHoaDonRepository chiTietHoaDonRepository;
    private final MatHangRepository matHangRepository;
    private final BanRepository banRepository;
    private final ChiNhanhService chiNhanhService;
    private final NguoiDungService nguoiDungService;
    private final BanService banService;
    private final DatLichService datLichService;
    private final ChiTietHoaDonService chiTietHoaDonService;

    public List<HoaDonResponse> layDSHoaDon() {
        return hoaDonRepository.findAll().stream().map(this::chuyenSangDto).toList();
    }

    public HoaDon layHoaDonTheoId(Integer maHoaDon) {
        return hoaDonRepository.findById(maHoaDon)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    public HoaDonResponse layChiTietHoaDon(Integer maHoaDon) {
        HoaDon hoaDon = layHoaDonTheoId(maHoaDon);
        return chuyenSangDto(hoaDon);
    }

    @Transactional
    public HoaDonResponse taoHoaDon(Integer maQuanLy, HoaDonRequest request) {
        NguoiDung quanLy = nguoiDungService.layNguoiDungTheoId(maQuanLy);
        Ban ban = banService.layBanTrangThaiOK(request.maBan());
        NguoiDung khachHang = nguoiDungService.layNguoiDungTheoSDT(request.soDienThoai());

        HoaDon hoaDon = HoaDon.builder()
                .ban(ban)
                .nguoiLapHoaDon(quanLy)
                .khachHang(khachHang)
                .build();

        HoaDon savedHoaDon = hoaDonRepository.save(hoaDon);
        ban.setTrangThai(!ban.getTrangThai());
        banRepository.save(ban);

        if (request.maDatLich() != null) ganDatLich(hoaDon, request.maDatLich());

        return chuyenSangDto(hoaDonRepository.save(savedHoaDon));
    }

    private void ganDatLich(HoaDon hoaDon, Integer maDatLich) {
        DatLich datLich = datLichService.layDatLichTheoId(maDatLich);
        List<ChiTietHoaDon> listChiTiet = datLich
                .getListDatTruoc()
                .stream()
                .map(datTruoc -> chuyenDatTruoc_ChiTietHD(datTruoc, hoaDon))
                .toList();

        hoaDon.setListChiTietHoaDon(listChiTiet);
        hoaDonRepository.save(hoaDon);
    }

    private ChiTietHoaDon chuyenDatTruoc_ChiTietHD(DatTruoc datTruoc, HoaDon hoaDon) {
        return ChiTietHoaDon.builder()
                .matHang(datTruoc.getMatHang())
                .hoaDon(hoaDon)
                .soLuong(datTruoc.getSoLuong())
                .donGia(datTruoc.getDonGia())
                .build();
    }

    @Transactional
    public HoaDonResponse thanhToanHoaDon(Integer maHoaDon) {
        BigDecimal tongTien = chiTietHoaDonService.layTongTien(maHoaDon);
//        if (hoaDon.getKhachHang() != null && hoaDon.getTongTien() != null) {
//            KhachHang kh = hoaDon.getKhachHang();
//            int diemThem = hoaDon.getTongTien().divide(BigDecimal.valueOf(10000), java.math.RoundingMode.HALF_UP).intValue();
//            int currentDiem = kh.getDiemTichLuy() != null ? kh.getDiemTichLuy() : 0;
//            kh.setDiemTichLuy(currentDiem + diemThem);
//            khachHangRepository.save(kh);
//        }

        HoaDon hoaDon = layHoaDonTheoId(maHoaDon);
        hoaDon.setTrangThai(TrangThaiHoaDon.HOAN_THANH);
        Ban ban = hoaDon.getBan();
        ban.setTrangThai(!ban.getTrangThai());
        banRepository.save(ban);
        return chuyenSangDto(hoaDonRepository.save(hoaDon));
    }

    @Transactional
    public void xoaHoaDon(Integer maHoaDon) {
        if (!hoaDonRepository.existsById(maHoaDon)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        hoaDonRepository.deleteById(maHoaDon);
    }

    public HoaDonResponse chuyenSangDto(HoaDon hoaDon) {
        int maKhachHang = 0;
        NguoiDung khachHang = hoaDon.getKhachHang();
        if (khachHang!=null) maKhachHang = khachHang.getMaNguoiDung();
        List<ChiTietHoaDonResponse> listChiTiet = chiTietHoaDonService.danhSachChiTietHoaDon(hoaDon);
        return HoaDonResponse.builder()
                .maHoaDon(hoaDon.getMaHoaDon())
                .maChiNhanh(hoaDon.getBan().getChiNhanh().getMaChiNhanh())
                .maKhachHang(maKhachHang)
                .trangThai(hoaDon.getTrangThai())
                .tongTien(hoaDon.getTongTien())
                .ngayLapHoaDon(hoaDon.getNgayLapHoaDon())
                .listChiTietHoaDon(listChiTiet)
                .build();
    }
}

