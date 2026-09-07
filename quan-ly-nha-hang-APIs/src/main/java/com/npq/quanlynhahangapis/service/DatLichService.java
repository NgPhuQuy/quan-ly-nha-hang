package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.dto.request.DatTruocRequest;
import com.npq.quanlynhahangapis.dto.request.TrangThaiDatLichRequest;
import com.npq.quanlynhahangapis.dto.response.DatLichResponse;
import com.npq.quanlynhahangapis.dto.response.DatTruocResponse;
import com.npq.quanlynhahangapis.dto.response.KhungGioResponse;
import com.npq.quanlynhahangapis.entity.*;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiDatLich;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.DatLichRepository;
import com.npq.quanlynhahangapis.repository.DatTruocRepository;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class DatLichService {
    private final NguoiDungService nguoiDungService;
    private final DatLichRepository datLichRepository;
    private final DatTruocRepository datTruocRepository;
    private final ChiNhanhService chiNhanhService;
    private final DatTruocService datTruocService;
    private final MatHangService matHangService;
    private final JwtUtil jwtUtil;

    @Transactional
    public DatLichResponse datLich(DatLichRequest request, Integer maNguoiDung) {
        NguoiDung nguoiDung = nguoiDungService.layNguoiDungTheoId(maNguoiDung);
        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(request.maChiNhanh());

        validateNgayGioDatLich(request, chiNhanh);

        // todo dem so dat lich dua tren gio, va ngay giong thong ke

        DatLich datLich = DatLich.builder()
                .nguoiDung(nguoiDung)
                .chiNhanh(chiNhanh)
                .ngay(request.ngay())
                .gio(request.gio())
                .ghiChu(request.ghiChu())
                .trangThai(TrangThaiDatLich.DA_XAC_NHAN)
                .build();

        DatLich savedDatLich = datLichRepository.save(datLich);

        if (request.listDatTruoc() != null && !request.listDatTruoc().isEmpty()) {
            List<DatTruoc> listDatTruoc = new ArrayList<>();
            for (DatTruocRequest r : request.listDatTruoc()) {
                listDatTruoc.add(datTruocService.chuyenSangObj(r, savedDatLich));
            }
            savedDatLich.setListDatTruoc(listDatTruoc);
            datTruocRepository.saveAll(listDatTruoc);
        }

        return chuyenSangDto(savedDatLich);
    }

    private void validateNgayGioDatLich(DatLichRequest request, ChiNhanh chiNhanh) {
        if (request.ngay().isBefore(LocalDate.now())) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }

        if (request.ngay().isEqual(LocalDate.now()) && request.gio().isBefore(LocalTime.now().plusHours(3))) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }

        if (request.gio().isBefore(chiNhanh.getGioHoatDong()) && request.gio().isAfter(chiNhanh.getGioDongCua())) {
            throw new AppException(ErrorCode.INVALID_BOOKING_TIME);
        }
    }




//    public List<KhungGio> laySoLuongDonTrenGio(Integer maChiNhanh, LocalDate ngay){
//        List<KhungGio> listKhungGio = new ArrayList<>();
//        List<DatLich> listDatLich = datLichRepository.findByChiNhanh_MaChiNhanhAndNgay(maChiNhanh, ngay);
//        listDatLich.forEach(datLich -> );
//        return
//    }

    public List<KhungGioResponse> layKhungGio(Integer maChiNhanh, LocalDate ngay) {
        //todo tra ve
        // thong ke so luong dat lich
        // cua tung thoi diem nhu 08:00 co so don la 5...
        // tra ve list {thoi gian : so luong con lai}
        return datLichRepository.countDatLichTheoGio(maChiNhanh, ngay);
    }

    public List<DatLichResponse> layDSDatLich() {
        return datLichRepository.findAll().stream().map(this::chuyenSangDto).toList();
    }

    public List<DatLichResponse> layDSDatLichTheoChiNhanh(Integer maChiNhanh) {
        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(maChiNhanh);
        DatLich probe = DatLich.builder().chiNhanh(chiNhanh).build();
        return datLichRepository.findAll(Example.of(probe))
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public DatLichResponse layTheoId(Integer maDatLich) {
        return chuyenSangDto(layDatLichTheoId(maDatLich));
    }

    public List<DatLichResponse> danhSachDatLichCuaToi(Integer maNguoiDung) {
        return datLichRepository.findAll()
                .stream()
                .filter(datLich -> datLich.getNguoiDung().getMaNguoiDung().equals(maNguoiDung))
                .map(this::chuyenSangDto)
                .toList();
    }

    public DatLich layDatLichTheoId(Integer maDatLich) {
        return datLichRepository.findById(maDatLich)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    @Transactional
    public DatLichResponse capNhatTrangThai(Integer maDatLich, TrangThaiDatLichRequest trangThai) {
        DatLich datLich = layDatLichTheoId(maDatLich);
        datLich.setTrangThai(trangThai.trangThai());
        return chuyenSangDto(datLichRepository.save(datLich));
    }

    @Transactional
    public DatLichResponse capNhatDatLich(Integer maDatLich, DatLichRequest request) {
        DatLich datLich = layDatLichTheoId(maDatLich);
        ChiNhanh chiNhanh = chiNhanhService.layChiNhanhTheoId(request.maChiNhanh());
        datLich.setChiNhanh(chiNhanh);
        validateNgayGioDatLich(request, chiNhanh);
        datLich.setNgay(request.ngay());
        datLich.setGio(request.gio());
        datLich.setGhiChu(request.ghiChu());

        return chuyenSangDto(datLichRepository.save(datLich));
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

    private boolean checkQuaGio(DatLich datLich) {
        if (datLich.getNgay().isBefore(LocalDate.now())) {
            return true;
        }
        if (datLich.getNgay().isEqual(LocalDate.now())) {
            return datLich.getGio().isBefore(LocalTime.now().minusHours(1));
        }
        return false;
    }

    public List<DatLich> danhSachDatLichQuaGio() {
        return datLichRepository.findAll().stream()
                .filter(this::checkQuaGio)
                .toList();
    }
}
