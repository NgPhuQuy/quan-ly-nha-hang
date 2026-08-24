package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.DatLichRequest;
import com.npq.quanlynhahangapis.dto.response.DatLichResponse;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.entity.DatLich;
import com.npq.quanlynhahangapis.entity.KhachHang;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.DatLichRepository;
import com.npq.quanlynhahangapis.repository.KhachHangRepository;
import com.npq.quanlynhahangapis.utils.JwtUtil;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class DatLichService {
    private final DatLichRepository datLichRepository;
    private final KhachHangRepository khachHangRepository;
    private final ChiNhanhService chiNhanhService;
    private final JwtUtil jwtUtil;

    public DatLichResponse datLich(DatLichRequest request) {
        // TODO: validate nghiệp vụ

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Integer maNguoiDung = (Integer) authentication.getPrincipal();

        KhachHang khachHang = khachHangRepository.findById(maNguoiDung)
                .orElseThrow(() ->
                        new AppException(ErrorCode.USER_NOT_FOUND));

        ChiNhanh chiNhanh =
                chiNhanhService.layChiNhanhTheoId(request.maChiNhanh());

        DatLich datLich = DatLich.builder()
                .khachHang(khachHang)
                .chiNhanh(chiNhanh)
                .ngay(request.ngay())
                .gio(request.gio())
                .soKhach(request.soKhach())
                .ghiChu(request.ghiChu())
                .build();

        return chuyenSangDto(datLichRepository.save(datLich));
    }

    public List<DatLichResponse> layDSDatLich() {
        return datLichRepository.findAll()
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public DatLichResponse layTheoId(Integer maDatLich) {
        return chuyenSangDto(datLichRepository.getReferenceById(maDatLich));
    }

    private DatLichResponse chuyenSangDto(DatLich dto) {
        return DatLichResponse.builder()
                .maChiNhanh(dto.getChiNhanh().getMaChiNhanh())
                .ngay(dto.getNgay())
                .gio(dto.getGio())
                .soKhach(dto.getSoKhach())
                .ghiChu(dto.getGhiChu())
                .listDatTruoc(dto.getListDatTruoc())
                .build();
    }


}
