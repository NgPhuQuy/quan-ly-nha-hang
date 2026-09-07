package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.MatHangRequest;
import com.npq.quanlynhahangapis.dto.response.MatHangResponse;
import com.npq.quanlynhahangapis.entity.ChiNhanh;
import com.npq.quanlynhahangapis.entity.MatHang;
import com.npq.quanlynhahangapis.entity.TrangThaiMatHangChiNhanh;
import com.npq.quanlynhahangapis.entity.enums.LoaiMatHang;
import com.npq.quanlynhahangapis.entity.enums.TrangThaiMatHang;
import com.npq.quanlynhahangapis.exception.AppException;
import com.npq.quanlynhahangapis.exception.ErrorCode;
import com.npq.quanlynhahangapis.repository.MatHangRepository;
import com.npq.quanlynhahangapis.repository.TrangThaiMatHangChiNhanhRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class MatHangService {
    private final TrangThaiMatHangChiNhanhRepository trangThaiMatHangChiNhanhRepository;
    private final TrangThaiMatHangChiNhanhService trangThaiMatHangChiNhanhService;
    private final CloudinaryService cloudinaryService;
    private final MatHangRepository matHangRepository;

    @Transactional
    public MatHangResponse taoMatHang(MatHangRequest request) {
        String url = cloudinaryService.taiAnhLenCloudinary(request.anhMinhHoa());

        MatHang matHang = MatHang.builder()
                .tenMatHang(request.tenMatHang())
                .giaMatHang(request.giaMatHang())
                .loaiMatHang(request.loaiMatHang())
                .anhMinhHoa(url)
                .build();

        MatHang saved = matHangRepository.save(matHang);
        trangThaiMatHangChiNhanhService.sinhMonAnChiNhanhMacDinh(saved);

        return chuyenSangDto(saved);
    }

    public List<MatHang> layDanhSachMatHang() {
        return matHangRepository.findAll();
    }

    public List<MatHangResponse> layTatCaMatHang() {
        return layDanhSachMatHang().stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public MatHang layMatHangTheoId(Integer maMatHang) {
        return matHangRepository.findById(maMatHang)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    public MatHangResponse chiTietMatHang(Integer maMatHang) {
        return chuyenSangDto(layMatHangTheoId(maMatHang));
    }

    @Transactional
    public MatHangResponse capNhatMatHang(Integer maMatHang, MatHangRequest request) {
        MatHang matHang = layMatHangTheoId(maMatHang);
        String url = cloudinaryService.taiAnhLenCloudinary(request.anhMinhHoa());

        matHang.setTenMatHang(request.tenMatHang());
        matHang.setGiaMatHang(request.giaMatHang());
        matHang.setLoaiMatHang(request.loaiMatHang());
        matHang.setAnhMinhHoa(url);

        return chuyenSangDto(matHangRepository.save(matHang));
    }

    public List<MatHangResponse> layDSMonAn(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang()))
                .filter(this::laMonAn)
                .toList();
    }

    public List<MatHangResponse> layDSThucUong(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang()))
                .filter(this::laThucUong)
                .toList();
    }

    public List<MatHangResponse> layDSDichVu(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang()))
                .filter(this::laDichVu)
                .toList();
    }

    private boolean laMonAn(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang().equals(LoaiMatHang.MON_AN);
    }

    private boolean laThucUong(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang().equals(LoaiMatHang.THUC_UONG);
    }

    private boolean laDichVu(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang().equals(LoaiMatHang.DICH_VU);
    }

    public MatHangResponse chuyenSangDto(MatHang matHang) {
        return MatHangResponse.builder()
                .maMatHang(matHang.getMaMatHang())
                .tenMatHang(matHang.getTenMatHang())
                .anhMinhHoa(matHang.getAnhMinhHoa())
                .giaMatHang(matHang.getGiaMatHang())
                .loaiMatHang(matHang.getLoaiMatHang())
                .build();
    }

    public List<MatHangResponse> layDanhSachMatHangOK(Integer maChiNhanh) {
        return matHangRepository.layDanhSachMatHangOKChiNhanh(maChiNhanh)
                .stream()
                .map(this::chuyenSangDto)
                .toList();
    }


}
