package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.dto.request.DatTruocRequest;
import com.npq.quanlynhahangapis.dto.response.DatLichResponse;
import com.npq.quanlynhahangapis.dto.response.KhungGioResponse;
import com.npq.quanlynhahangapis.entity.*;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.*;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class DatLichService {
    private static final int SLOT_INTERVAL_MINUTES = 30;
    private static final int BOOKING_DURATION_HOURS = 2;

    private final DatTruocRepository datTruocRepository;
    private final MatHangRepository matHangRepository;
    private final DatLichRepository datLichRepository;
    private final GioHoatDongRepository gioHoatDongRepository;
    private final KhachHangRepository khachHangRepository;
    private final ChiNhanhService chiNhanhService;
    private final DatTruocService datTruocService;
    private final JwtUtil jwtUtil;

    @Transactional
    public DatLichResponse datLich(DatLichRequest request) {
        if (request == null || request.maChiNhanh() == null || request.ngay() == null
                || request.gio() == null || request.soKhach() == null || request.soKhach() <= 0) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Integer maNguoiDung = (Integer) authentication.getPrincipal();
        Integer maNguoiDung = 1;
        KhachHang khachHang = khachHangRepository
                .findById(maNguoiDung)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(request.maChiNhanh());

        if (chiNhanh.getSucChua() == null || chiNhanh.getSucChua() <= 0
                || request.soKhach() > chiNhanh.getSucChua()) {
            throw new AppException(ErrorCode.CAPACITY_EXCEEDED);
        }

        GioHoatDong gioHoatDong = layGioHoatDong(request.maChiNhanh(), request.ngay());

        LocalTime gioBatDau = request.gio();
        LocalTime gioKetThuc = gioBatDau.plusHours(BOOKING_DURATION_HOURS);

        if (gioBatDau.isBefore(gioHoatDong.getGioMoCua())
                || gioBatDau.isAfter(gioHoatDong.getGioDongCua())) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }

        List<DatLich> listDatLich = datLichRepository
                .findByChiNhanh_MaChiNhanhAndNgay(request.maChiNhanh(), request.ngay());

        int conCho = tinhConCho(chiNhanh, listDatLich, gioBatDau, gioKetThuc);

        if (conCho < request.soKhach()) {
            throw new AppException(ErrorCode.CAPACITY_EXCEEDED);
        }

        DatLich datLich = DatLich.builder()
                .khachHang(khachHang)
                .chiNhanh(chiNhanh)
                .ngay(request.ngay())
                .gio(request.gio())
                .soKhach(request.soKhach())
                .ghiChu(request.ghiChu())
                .build();

        List<DatTruoc> listDatTruoc = new ArrayList<>();

        for (DatTruocRequest r : request.listDatTruoc()) {
            DatTruoc datTruoc = this.chuyenSangObj(r, datLich);
            listDatTruoc.add(datTruoc);
        }
        datLich.setListDatTruoc(listDatTruoc);
        datTruocRepository.saveAll(listDatTruoc);

        return chuyenSangDto(datLichRepository.save(datLich));
    }

    private DatTruoc chuyenSangObj(DatTruocRequest request, DatLich datLich) {
        MatHang matHang = matHangRepository.findById(request.maMatHang())
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
        return DatTruoc.builder()
                .datLich(datLich)
                .matHang(matHang)
                .soLuong(request.soLuong())
                .donGia(matHang.getGiaMatHang())
                .build();
    }

    public List<KhungGioResponse> layKhungGio(Integer maChiNhanh, LocalDate ngay, Integer soKhach) {
        if (maChiNhanh == null || ngay == null || soKhach == null || soKhach <= 0) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }

        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(maChiNhanh);
        if (chiNhanh.getSucChua() == null || chiNhanh.getSucChua() <= 0 || soKhach > chiNhanh.getSucChua()) {
            throw new AppException(ErrorCode.CAPACITY_EXCEEDED);
        }

        GioHoatDong gioHoatDong = layGioHoatDong(maChiNhanh, ngay);
        List<DatLich> datLiches = datLichRepository.findByChiNhanh_MaChiNhanhAndNgay(maChiNhanh, ngay);

        List<KhungGioResponse> result = new ArrayList<>();
        LocalTime slotBatDau = gioHoatDong.getGioMoCua();

        while (!slotBatDau.isAfter(gioHoatDong.getGioDongCua())) {
            LocalTime slotKetThuc = slotBatDau.plusHours(BOOKING_DURATION_HOURS);
            int conCho = tinhConCho(chiNhanh, datLiches, slotBatDau, slotKetThuc);
            result.add(new KhungGioResponse(slotBatDau, conCho, conCho >= soKhach));
            slotBatDau = slotBatDau.plusMinutes(SLOT_INTERVAL_MINUTES);
        }

        return result;
    }

    public List<DatLichResponse> layDSDatLich() {
        return datLichRepository.findAll().stream().map(this::chuyenSangDto).toList();
    }

    public DatLichResponse layTheoId(Integer maDatLich) {
        return chuyenSangDto(datLichRepository
                .findById(maDatLich)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND)));
    }

    private GioHoatDong layGioHoatDong(Integer maChiNhanh, LocalDate ngay) {
        DayOfWeek thu = ngay.getDayOfWeek();
        List<GioHoatDong> list = gioHoatDongRepository.findByChiNhanh_MaChiNhanh(maChiNhanh);

        return list.stream().
                filter(gio -> gio.getThu() == thu)
                .filter(gio -> Boolean.TRUE.equals(gio.getHoatDong()))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.CLOSED_DAY));
    }

    private int tinhConCho(ChiNhanh chiNhanh, List<DatLich> listDatLich,
                           LocalTime slotBatDau, LocalTime slotKetThuc) {
        int tongSoKhach = 0;

        for (DatLich datLich : listDatLich) {
            LocalTime bookingBatDau = datLich.getGio();
            LocalTime bookingKetThuc = bookingBatDau.plusHours(BOOKING_DURATION_HOURS);

            if (biOverlap(slotBatDau, slotKetThuc, bookingBatDau, bookingKetThuc)) {
                tongSoKhach += datLich.getSoKhach();
            }
        }

        return Math.max(0, chiNhanh.getSucChua() - tongSoKhach);
    }

    private boolean biOverlap(LocalTime slotBatDau, LocalTime slotKetThuc,
                              LocalTime bookingBatDau, LocalTime bookingKetThuc) {
        return slotBatDau.isBefore(bookingKetThuc)
                && slotKetThuc.isAfter(bookingBatDau);
    }

    private DatLichResponse chuyenSangDto(DatLich dto) {
        return DatLichResponse.builder()
                .maChiNhanh(dto.getChiNhanh().getMaChiNhanh())
                .ngay(dto.getNgay())
                .gio(dto.getGio())
                .soKhach(dto.getSoKhach())
                .ghiChu(dto.getGhiChu())
                .listDatTruoc(dto.getListDatTruoc()
                        .stream()
                        .map(datTruocService::chuyenSangDto)
                        .toList())
                .build();
    }
}