package com.npq.quanlynhahangapis.service;

import com.npq.quanlynhahangapis.dto.request.MatHangRequest;
import com.npq.quanlynhahangapis.dto.response.MatHangResponse;
import com.npq.quanlynhahangapis.entity.MatHang;
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
        String url = request.anhMinhHoa() != null && !request.anhMinhHoa().isEmpty()
                ? cloudinaryService.taiAnhLenCloudinary(request.anhMinhHoa())
                : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop";

        MatHang matHang = MatHang.builder()
                .tenMatHang(request.tenMatHang())
                .giaMatHang(request.giaMatHang())
                .loaiMatHang(request.loaiMatHang() != null ? request.loaiMatHang() : LoaiMatHang.MON_AN)
                .anhMinhHoa(url)
                .build();

        MatHang saved = matHangRepository.save(matHang);
        trangThaiMatHangChiNhanhService.sinhMonAnChiNhanhMacDinh(saved);

        return chuyenSangDto(saved);
    }

    public List<MatHangResponse> layTatCaMatHang() {
        return matHangRepository.findAll().stream()
                .map(this::chuyenSangDto)
                .toList();
    }

    public MatHangResponse layMatHangTheoId(Integer maMatHang) {
        return matHangRepository.findById(maMatHang)
                .map(this::chuyenSangDto)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));
    }

    @Transactional
    public MatHangResponse capNhatMatHang(Integer maMatHang, MatHangRequest request) {
        MatHang matHang = matHangRepository.findById(maMatHang)
                .orElseThrow(() -> new AppException(ErrorCode.SOURCE_NOT_FOUND));

        if (request.tenMatHang() != null) matHang.setTenMatHang(request.tenMatHang());
        if (request.giaMatHang() != null) matHang.setGiaMatHang(request.giaMatHang());
        if (request.loaiMatHang() != null) matHang.setLoaiMatHang(request.loaiMatHang());
        if (request.anhMinhHoa() != null && !request.anhMinhHoa().isEmpty()) {
            matHang.setAnhMinhHoa(cloudinaryService.taiAnhLenCloudinary(request.anhMinhHoa()));
        }

        return chuyenSangDto(matHangRepository.save(matHang));
    }

    @Transactional
    public void xoaMatHang(Integer maMatHang) {
        if (!matHangRepository.existsById(maMatHang)) {
            throw new AppException(ErrorCode.SOURCE_NOT_FOUND);
        }
        matHangRepository.deleteById(maMatHang);
    }

    public List<MatHangResponse> layDSMonAn(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang(), item.getTrangThaiMatHang()))
                .filter(this::laMonAn)
                .toList();
    }

    public List<MatHangResponse> layDSThucUong(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang(), item.getTrangThaiMatHang()))
                .filter(this::laThucUong)
                .toList();
    }

    public List<MatHangResponse> layDSDichVu(Integer maChiNhanh) {
        return trangThaiMatHangChiNhanhRepository
                .findByChiNhanh_MaChiNhanhAndTrangThaiMatHang(maChiNhanh, TrangThaiMatHang.DANG_BAN)
                .stream()
                .map(item -> chuyenSangDto(item.getMatHang(), item.getTrangThaiMatHang()))
                .filter(this::laDichVu)
                .toList();
    }

    private boolean laMonAn(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang() != null && matHangResponse.loaiMatHang().equals(LoaiMatHang.MON_AN);
    }

    private boolean laThucUong(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang() != null && matHangResponse.loaiMatHang().equals(LoaiMatHang.THUC_UONG);
    }

    private boolean laDichVu(MatHangResponse matHangResponse) {
        return matHangResponse.loaiMatHang() != null && matHangResponse.loaiMatHang().equals(LoaiMatHang.DICH_VU);
    }

    public MatHangResponse chuyenSangDto(MatHang matHang) {
        return chuyenSangDto(matHang, TrangThaiMatHang.DANG_BAN);
    }

    public MatHangResponse chuyenSangDto(MatHang matHang, TrangThaiMatHang trangThai) {
        String trangThaiStr = trangThai == TrangThaiMatHang.DANG_BAN ? "Đang bán"
                : trangThai == TrangThaiMatHang.HET_HANG ? "Hết món" : "Tạm ngưng";

        String danhMuc = matHang.getLoaiMatHang() == LoaiMatHang.THUC_UONG ? "Đồ uống"
                : matHang.getLoaiMatHang() == LoaiMatHang.DICH_VU ? "Dịch vụ" : "Món chính";

        return MatHangResponse.builder()
                .maMatHang(matHang.getMaMatHang())
                .tenMatHang(matHang.getTenMatHang())
                .anhMinhHoa(matHang.getAnhMinhHoa())
                .giaMatHang(matHang.getGiaMatHang())
                .loaiMatHang(matHang.getLoaiMatHang())
                .trangThai(trangThaiStr)
                .danhMuc(danhMuc)
                .build();
    }
}
