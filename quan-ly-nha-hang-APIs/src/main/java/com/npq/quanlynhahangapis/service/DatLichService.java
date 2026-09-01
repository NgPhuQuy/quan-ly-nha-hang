package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.dto.request.DatTruocRequest;
import com.npq.quanlynhahangapis.dto.response.DatLichResponse;
import com.npq.quanlynhahangapis.dto.response.DatTruocResponse;
import com.npq.quanlynhahangapis.dto.response.KhungGioResponse;
import com.npq.quanlynhahangapis.entity.*;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
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
import java.util.*;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class DatLichService {
    private static final int SLOT_INTERVAL_MINUTES = 30;
    private static final int BOOKING_DURATION_HOURS = 2;

    private final NguoiDungRepository nguoiDungRepository;
    private final DatTruocRepository datTruocRepository;
    private final MatHangRepository matHangRepository;
    private final DatLichRepository datLichRepository;
    private final GioHoatDongRepository gioHoatDongRepository;
    private final BanRepository banRepository;
    private final ChiNhanhService chiNhanhService;
    private final DatTruocService datTruocService;
    private final JwtUtil jwtUtil;

    @Transactional
    public DatLichResponse datLich(DatLichRequest request) {
        if (request.ngay().isBefore(LocalDate.now())) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assert authentication != null;
        String username = Objects.requireNonNull(authentication.getPrincipal()).toString();
        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {
            if (authentication.getPrincipal() instanceof Integer userId) {
                NguoiDung nguoiDung = nguoiDungRepository.findById(userId).orElse(null);
            }
        }

        NguoiDung nguoiDung = nguoiDungRepository.findById((Integer) authentication.getPrincipal())
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_FOUND)) ;

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
                .findByChiNhanh_MaChiNhanhAndNgayAndTrangThaiNotIn(
                        request.maChiNhanh(),
                        request.ngay(),
                        List.of(TrangThaiDatLich.DA_HUY, TrangThaiDatLich.VANG_MAT)
                );

        int conCho = tinhConCho(chiNhanh, listDatLich, gioBatDau, gioKetThuc);

        if (conCho < request.soKhach()) {
            throw new AppException(ErrorCode.CAPACITY_EXCEEDED);
        }



        String maCode = sinhMaDatLichCode(request.ngay().getYear());

        DatLich datLich = DatLich.builder()
                .chiNhanh(chiNhanh)
                .ngay(request.ngay())
                .gio(request.gio())
                .soKhach(request.soKhach())
                .ghiChu(request.ghiChu())
                .build();

        DatLich savedDatLich = datLichRepository.save(datLich);

        if (request.listDatTruoc() != null && !request.listDatTruoc().isEmpty()) {
            List<DatTruoc> listDatTruoc = new ArrayList<>();
            for (DatTruocRequest r : request.listDatTruoc()) {
                DatTruoc datTruoc = this.chuyenSangObj(r, savedDatLich);
                listDatTruoc.add(datTruoc);
            }
            savedDatLich.setListDatTruoc(listDatTruoc);
            datTruocRepository.saveAll(listDatTruoc);
        }

        return chuyenSangDto(savedDatLich);
    }

    private String sinhMaDatLichCode(int year) {
        int randomPart = 1000 + new Random().nextInt(9000);
        return String.format("5S-%d-%04d", year, randomPart);
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
        List<DatLich> datLiches = datLichRepository.findByChiNhanh_MaChiNhanhAndNgayAndTrangThaiNotIn(
                maChiNhanh,
                ngay,
                List.of(TrangThaiDatLich.DA_HUY, TrangThaiDatLich.VANG_MAT)
        );

        List<KhungGioResponse> result = new ArrayList<>();
        LocalTime slotBatDau = gioHoatDong.getGioMoCua();
        boolean isToday = ngay.isEqual(LocalDate.now());
        LocalTime now = LocalTime.now();

        while (!slotBatDau.isAfter(gioHoatDong.getGioDongCua())) {
            LocalTime slotKetThuc = slotBatDau.plusHours(BOOKING_DURATION_HOURS);
            boolean isPast = isToday && slotBatDau.isBefore(now);
            int conCho = isPast ? 0 : tinhConCho(chiNhanh, datLiches, slotBatDau, slotKetThuc);
            boolean coTheDat = !isPast && (conCho >= soKhach);

            result.add(new KhungGioResponse(slotBatDau, conCho, coTheDat));
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

//    public DatLichResponse traCuu(String codeOrId) {
//        return datLichRepository.findByMaDatLichCode(codeOrId.trim())
//                .or(() -> {
//                    try {
//                        Integer id = Integer.parseInt(codeOrId.trim());
//                        return datLichRepository.findById(id);
//                    } catch (NumberFormatException e) {
//                        return java.util.Optional.empty();
//                    }
//                })
//                .map(this::chuyenSangDto)
//                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
//    }

    @Transactional
    public DatLichResponse capNhatTrangThai(Integer maDatLich, TrangThaiDatLich trangThai, Integer maBan) {
        DatLich datLich = datLichRepository.findById(maDatLich)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        if (trangThai != null) {
            datLich.setTrangThai(trangThai);
        }
        return chuyenSangDto(datLichRepository.save(datLich));
    }

    @Transactional
    public DatLichResponse capNhatDatLich(Integer maDatLich, DatLichRequest request) {
        DatLich datLich = datLichRepository.findById(maDatLich)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        if (request.ngay() != null) datLich.setNgay(request.ngay());
        if (request.gio() != null) datLich.setGio(request.gio());
        if (request.soKhach() != null) datLich.setSoKhach(request.soKhach());
        if (request.ghiChu() != null) datLich.setGhiChu(request.ghiChu());

        return chuyenSangDto(datLichRepository.save(datLich));
    }

    @Transactional
    public void xoaDatLich(Integer maDatLich) {
        if (!datLichRepository.existsById(maDatLich)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        datLichRepository.deleteById(maDatLich);
    }

    private GioHoatDong layGioHoatDong(Integer maChiNhanh, LocalDate ngay) {
        DayOfWeek thu = ngay.getDayOfWeek();
        List<GioHoatDong> list = gioHoatDongRepository.findByChiNhanh_MaChiNhanh(maChiNhanh);

        return list.stream()
                .filter(gio -> gio.getThu() == thu)
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
                tongSoKhach += (datLich.getSoKhach() != null ? datLich.getSoKhach() : 0);
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
        List<DatTruocResponse> listDatTruoc = dto.getListDatTruoc()
                .stream()
                .map(datTruocService::chuyenSangDto)
                .toList();

        return DatLichResponse.builder()
                .maDatLich(dto.getMaDatLich())
                .maChiNhanh(dto.getChiNhanh().getMaChiNhanh())
                .ngay(dto.getNgay())
                .gio(dto.getGio())
                .soKhach(dto.getSoKhach())
                .ghiChu(dto.getGhiChu())
                .trangThai(dto.getTrangThai())
                .listDatTruoc(listDatTruoc)
                .build();
    }
}
